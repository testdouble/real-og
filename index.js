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

export default async function (src, dest, options) {
  log(`Writing ${dest} from ${src} markdown`)
  const page = await readMarkdown(src, { summarySeparator: '<!--more-->', ...options })
  log(`Rendering SVG for ${src}`)
  const svg = await renderTemplate(page, {
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
    ],
    ...options
  })
  log(`Converting SVG to PNG for ${src}`)
  const png = await convertSvgToPng(svg)
  log(`Exporting image for ${src}`)
  await exportImage(png, dest, { fileType: 'png', ...options })
  log(`Finished writing ${dest}`)
  return dest
}
