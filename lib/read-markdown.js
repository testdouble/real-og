import matter from 'gray-matter'
import showdown from 'showdown'

export default async function readMarkdown (src, options) {
  const markdown = matter.read(src, { excerpt_separator: options.summarySeparator })

  const converter = new showdown.Converter({
    noHeaderId: true,
    extensions: [...extensionsFor(options.markdownTailwindClasses, options.markdownStyleAttrs, options.markdownUnwrapElements, options.markdownExtensions)]
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
function extensionsFor (twClassMap = {}, styleAttrsMap = {}, unwrapElements = [], extensions = []) {
  return unwrapElements.map(el => {
    return {
      type: 'output',
      regex: new RegExp(`<${el}[^>]*>([^<]*)<\\/${el}>`, 'g'),
      replace: '$1'
    }
  }).concat(Object.keys(twClassMap).map(el => {
    return {
      type: 'output',
      regex: new RegExp(`<${el}(.*)>`, 'g'),
      replace: `<${el} tw="${twClassMap[el]}"$1>`
    }
  }), Object.keys(styleAttrsMap).map(el => {
    return {
      type: 'output',
      regex: new RegExp(`<${el}(.*)>`, 'g'),
      replace: `<${el} style="${styleAttrsMap[el]}"$1>`
    }
  }), extensions)
}
