import Photo from '../models/photos.model'

export const getPhotosByAlbumId = async (albumId) => {
  return await Photo.findAll({
    where: {
      album_id: albumId
    }
  })
}

export const addPhotos = async ({ albumId, files }) => {
  const photos = []
  for (const detail of files) {
    try {
      console.log(detail)
      const image_link = 'http://localhost:5000/' + detail.path
      const photo = await Photo.create({
        album_id: albumId,
        image_link: image_link
      })
      console.log(photo)
      photos.push(photo)
    } catch (err) {
      console.log(err)
    }
  }

  return photos
}

export const removePhotoById = async (id) => {
  return await Photo.destroy({
    where: { pid: id }
  })
}

export const removePhoto = async (photo) => {
  return await photo.destroy()
}

export const getPhotoById = async (id) => {
  return await Photo.findByPk(id)
}
