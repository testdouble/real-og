const matter = require('gray-matter')
const showdown = require('showdown')

module.exports = async function readMarkdown (src, options) {
  const markdown = matter.read(src, { excerpt_separator: options.summarySeparator })
  const converter = new showdown.Converter({
    noHeaderId: true,
    extensions: [...extensionsFor(options.markdownTailwindClasses || {})]
  })
  return {
    data: markdown.data,
    content: {
      markdown: markdown.content,
      html: converter.makeHtml(markdown.content)
    },
    summary: {
      markdown: markdown.excerpt,
      html: converter.makeHtml(markdown.excerpt)
    },
    globals: options.globals
  }
}

// Copied this technique from
// https://github.com/showdownjs/showdown/wiki/Add-default-classes-for-each-HTML-element
function extensionsFor (twClassMap) {
  return Object.keys(twClassMap).map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}(.*)>`, 'g'),
    replace: `<${key} tw="${twClassMap[key]}" $1>`
  }))
}
