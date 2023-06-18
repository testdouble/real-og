const path = require('path')
const fs = require('fs')

const readMarkdown = require('./lib/read-markdown')
const renderTemplate = require('./lib/render-template')
const convertSvgToPng = require('./lib/convert-svg-to-png')
const exportImage = require('./lib/export-image')

module.exports = async function (src, dest, options) {
  const page = await readMarkdown(src, { summarySeparator: '<!--more-->', ...options })
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
  const png = await convertSvgToPng(svg)

  await exportImage(png, dest, { fileType: 'png', ...options })
}
