import path from 'path'
import fs from 'fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'url'

import log from './lib/log.js'
import readMarkdown from './lib/read-markdown.js'
import renderTemplate from './lib/render-template.js'
import convertSvgToPng from './lib/convert-svg-to-png.js'
import exportImage from './lib/export-image.js'

const __dirname = fileURLToPath(path.dirname(import.meta.url))
const require = createRequire(import.meta.url)

const DEFAULT_CONFIG = {
  template: path.join(__dirname, 'default-template.html'),
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'Source Sans Pro',
      data: fs.readFileSync(require.resolve('@fontsource/source-sans-pro/files/source-sans-pro-latin-400-normal.woff')),
      weight: 400,
      style: 'normal'
    }
  ]
}

export default async function realOg (src, dest, options) {
  log(`Writing ${dest} from ${src} markdown`)
  const page = await readMarkdown(src, { summarySeparator: '<!--more-->', ...options })
  log(`Rendering SVG for ${src}`)
  const svg = await renderTemplate(page, Object.assign({}, DEFAULT_CONFIG, options))
  log(`Converting SVG to PNG for ${src}`)
  const png = await convertSvgToPng(svg)
  log(`Exporting image for ${src}`)
  await exportImage(png, dest, { fileType: 'png', ...options })
  log(`Finished writing ${dest}`)
  return dest
}

/* This is not a function to be proud of.
 * It will render the markdown to SVG at a particular width and with the user's
 * supplied template and options, and then it'll run a regex against the
 * resulting SVG to find the height of the first rect in the output.
 *
 * The output currently starts like this, which the regex is based on :
 *  <svg width="2088" height="100000" viewBox="0 0 2088 100000" xmlns="http://www.w3.org/2000/svg"><mask id="satori_om-id"><rect x="0" y="0" width="2102" height="549" fill="#fff"/></mask>
 *
 * Obligatory you can't parse HTML with regex link: https://blog.codinghorror.com/parsing-html-the-cthulhu-way/
 */
export async function measureHeight (src, options) {
  const page = await readMarkdown(src, { summarySeparator: '<!--more-->', ...options })
  const svg = await renderTemplate(page, Object.assign({}, DEFAULT_CONFIG, options))
  return Number(svg.match(/<rect[^>]*height="(\d+)"/)?.[1])
}
