import sharp from 'sharp'

export default async function exportImage (png, dest, options) {
  return await sharp(png).toFormat(
    options.fileType
  ).toFile(dest)
}
