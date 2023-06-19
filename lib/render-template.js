import ejs from 'ejs'
import satori from 'satori'
import parse from 'html-react-parser'

export default async function renderTemplate (page, options) {
  const template = await ejs.renderFile(options.template, page, { async: true })
  const markup = await parse(template)
  return await satori(returnTopNode(markup), {
    width: options.width,
    height: options.height,
    fonts: options.fonts
  })
}

// If array, find the first element that is an object, otherwise return self
function returnTopNode (markup) {
  if (Array.isArray(markup)) {
    return markup.find(node => typeof node === 'object')
  } else {
    return markup
  }
}
