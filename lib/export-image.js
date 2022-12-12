const sharp = require('sharp')

module.exports = async function exportImage (png, dest, options) {
  return await sharp(png).toFormat(
    options.fileType
  ).toFile(dest)
}
