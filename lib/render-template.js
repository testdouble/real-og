import ejs from 'ejs'
import satori from 'satori'
import { html } from 'satori-html'

export default async function renderTemplate (page, options) {
  const template = await ejs.renderFile(options.template, page, { async: true })
  return await satori(html(template), {
    width: options.width,
    height: options.height,
    fonts: options.fonts
  })
}
