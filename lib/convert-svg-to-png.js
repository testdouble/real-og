import { Resvg } from '@resvg/resvg-js'

export default function convertSvgToPng (svg) {
  return new Resvg(svg, { font: { loadSystemFonts: false } }).render().asPng()
}
