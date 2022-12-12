const matter = require('gray-matter')
const showdown = require('showdown')

module.exports = async function readMarkdown (src, options) {
  const markdown = matter.read(src, { excerpt_separator: options.summarySeparator })
  const converter = new showdown.Converter({ noHeaderId: true })
  return {
    data: markdown.data,
    content: {
      markdown: markdown.content,
      html: converter.makeHtml(markdown.content)
    },
    summary: {
      markdown: markdown.excerpt,
      html: converter.makeHtml(markdown.excerpt)
    }
  }
}
