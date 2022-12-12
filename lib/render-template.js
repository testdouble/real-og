const ejs = require('ejs')
const { default: satori } = require('satori')

module.exports = async function renderTemplate (page, options) {
  const { html } = await import('satori-html')
  const template = await ejs.renderFile(options.template, page, { async: true })
  return await satori(html(template), {
    width: options.width,
    height: options.height,
    fonts: options.fonts
  })
}
