# real-og

If you need a thing to generate social media [og:image](https://ogp.me) social
card images from the markdown pages on your static site, then this library may
help you piece together a script to do so.

## Usage

```js
const realOg = require('real-og')

// Async function, returns a promise
realOg('posts/my-post.md', 'img/my-post.png', {

  // Will be parsed as an EJS template and passed the following object:
  //   `data` - frontmatter of the markdown file
  //   `content.markdown` - Markdown below the frontmatter
  //   `content.html` - Compiled HTML of the Markdown below the frontmatter
  //   `summary.markdown` - Markdown up to the `summarySeparatory`
  //   `summary.html` - Compiled HTML up to the Markdown's `summarySeparatory`
  //   `globals.*` - Whatever you set as `globals` on this object
  template: 'template/social.html',

  // Optional options

  fileType: 'png', // jpg, gif, webp
  summarySeparator: '<!--more-->', // token that separates
  width: 1200,
  height: 630,
  globals: {
    /* Any additional stuff you want to send to the template. */
  }

  // At least one font is required by the satori package
  fonts: [
    {
      name: 'Source Sans Pro',
      data: fs.readFileSync(require.resolve('@fontsource/source-sans-pro/files/source-sans-pro-all-400-normal.woff')),
      weight: 400,
      style: 'normal'
    }
  ]
})
```

The template can contain any of the subset of HTML and CSS supported by
[satori](https://github.com/vercel/satori), including
[Tailwind](https://tailwindcss.com) classes via a `tw` attribute.

# Acknowledgements

This package was started by adapting the meat of
[eleventy-plugin-og-imag](https://github.com/KiwiKilian/eleventy-plugin-og-image)
into a standalone package exposing its core functionality as an API that isn't
coupled to the separately-excellent [11ty](https://www.11ty.dev)

## Code of Conduct

This project follows Test Double's [code of
conduct](https://testdouble.com/code-of-conduct) for all community interactions,
including (but not limited to) one-on-one communications, public posts/comments,
code reviews, pull requests, and GitHub issues. If violations occur, Test Double
will take any action they deem appropriate for the infraction, up to and
including blocking a user from the organization's repositories.
