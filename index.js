const path = require('path')
const fs = require('fs')

const log = require('./lib/log')
const readMarkdown = require('./lib/read-markdown')
const renderTemplate = require('./lib/render-template')
const convertSvgToPng = require('./lib/convert-svg-to-png')
const exportImage = require('./lib/export-image')

module.exports = async function (src, dest, options) {
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
