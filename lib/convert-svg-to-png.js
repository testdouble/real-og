const { Resvg } = require('@resvg/resvg-js')

module.exports = function convertSvgToPng (svg) {
  return new Resvg(svg, { font: { loadSystemFonts: false } }).render().asPng()
}
