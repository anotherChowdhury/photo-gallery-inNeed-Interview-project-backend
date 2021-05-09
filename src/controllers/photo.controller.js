import * as photoService from '../services/photo.service'
import { getAnAlbum } from '../services/album.service'
import ErrorWithStatus from '../services/error.service'

export const addPhotos = async (req, res, next) => {
  const { files } = req
  const { albumId } = req.body

  if (!albumId) throw new ErrorWithStatus('albumId is required', 400)
  if (!files.length) throw new ErrorWithStatus('photos is required', 400)

  try {
    const photos = await photoService.addPhotos({ albumId, files })
    return res.status(201).json({
      photos
    })
  } catch (err) {
    next(err)
  }
}

export const deletePhoto = async (req, res, next) => {
  const { id } = req.params
  const { userId } = req

  try {
    const photo = await photoService.getPhotoById(id)
    if (!photo) throw new ErrorWithStatus('No photo found', 400)

    const album = await getAnAlbum({ where: { album_id: photo.album_id, user_id: userId } })
    if (!album) throw new ErrorWithStatus('Not allowed', 400)
    await photoService.removePhoto(photo)

    return res.status(200).json({
      message: 'Photo deleted'
    })
  } catch (err) {
    next(err)
  }
}
