import s3 from '../../utils/libs/s3'
import auth0 from '../../utils/libs/auth0'
import runMiddleware, { rateLimiter } from '../../utils/functions/runMiddleware.function'
import { ERROR_CONSTRAINT } from '../../utils/enums'

export default auth0.requireAuthentication(async function upload(req, res) {
  try {
    await runMiddleware(req, res, rateLimiter)
    const { id, picture } = req.body
    const isFirstUpload = !picture?.includes('nz_v')
    const filename = createFilename(picture, id, isFirstUpload)
    const post = await s3.createPresignedPost({
      Bucket: process.env.BUCKET_NAME,
      Fields: {
        acl: 'public-read',
        key: filename,
      },
      Expires: 60, // seconds
      Conditions: [
        ['content-length-range', 0, 1048576], // up to 1 MB
      ],
    })

    // todo start -> outsoure as event: 'cleanup-pictures-digitalocean'
    if (!isFirstUpload) {
      const { error } = await deleteFile(picture)
      if (error) {
        throw Error(error.message)
      }
    }
    // todo end

    res.status(200).json({ ...post, filename })
  } catch (error) {
    console.error(error)
    const status =
      error.response?.errors[0]?.extensions?.code === ERROR_CONSTRAINT || error.message?.includes('jwt')
        ? 400
        : error.status ?? 500
    res.status(status).end(error.message)
  }
})

const createFilename = (picture, id, isFirstUpload) => {
  if (isFirstUpload) {
    return `${id}|nz_v1.jpeg`
  } else {
    const number = parseInt(picture.slice(0, -5).split('nz_v')[1]) + 1
    const newVersion = isNaN(number) ? 0 : number
    return `${id}|nz_v${newVersion}.jpeg`
  }
}

const deleteFile = picture => {
  const key = decodeURIComponent(picture.split('com/')[1])
  return new Promise((resolve, reject) => {
    s3.deleteObject(
      {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      },
      function (error, data) {
        if (error) {
          reject({ data: null, error })
        } else {
          resolve({ data, error: null })
        }
      }
    )
  })
}
