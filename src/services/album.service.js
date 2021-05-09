import Album from '../models/albums.model'
import Photos from '../models/photos.model'

import sequelize, { Op } from 'sequelize'
import Users from '../models/users.model'

export const addAlbum = async (args) => {
  return await Album.create(args)
}

export const getAnAlbum = async (conditions) => {
  return await Album.findOne(conditions)
}

export const getAlbums = async (conditions) => {
  return await Album.findAll(conditions)
}

export const getAlbumById = async (id) => {
  return await Album.findByPk(id, { include: [Photos] })
}

export const removeAlbumById = async (id) => {
  return await Album.destroy({ where: { aid: id }, cascade: true })
}

export const removeAlbumBy = async (album) => {
  return await album.destroy({ cascade: true })
}

export const getAlbumByUserId = async (id) => {
  return await Album.findAll({
    where: {
      user_id: id
    }
  })
}

export const getAllPublicAlbums = async ({ userId, lastReceivedAlbumId }) => {
  console.log('userid ', userId)
  let where = {}
  if (userId) {
    where = {
      is_public: true,
      aid: {
        [Op.gt]: lastReceivedAlbumId
      },
      user_id: {
        [Op.not]: userId
      }
    }
  } else {
    where = {
      is_public: true,
      aid: {
        [Op.gt]: lastReceivedAlbumId
      }
    }
  }

  return await Album.findAll({
    where,
    include: [
      {
        model: Users,
        attributes: ['uid', 'name']
      },
      {
        model: Photos,
        where: {
          pid: {
            [Op.in]: [
              sequelize.literal(
                'SELECT pid FROM (SELECT album_id,min(pid) as pid,image_link from photos group by album_id)'
              )
            ]
          }
        },
        attributes: ['pid', 'image_link']
      }
    ],
    limit: 3,
    order: [['aid', 'asc']]
  })
}

export const getAllAlbumsByUserId = async ({ userId, lastRecivedAlbumId }) => {
  return await Album.findAll({
    where: {
      user_id: userId,
      aid: {
        [Op.gt]: lastRecivedAlbumId
      }
    },
    include: [
      {
        model: Users,
        attributes: ['uid', 'name']
      },
      {
        model: Photos,
        where: {
          pid: {
            [Op.in]: [
              sequelize.literal(
                'SELECT pid FROM (SELECT album_id,min(pid) as pid,image_link from photos group by album_id)'
              )
            ]
          }
        },
        attributes: ['pid', 'image_link']
      }
    ],
    order: [['aid', 'asc']],
    limit: 50
  })
}

export const getAllPublicAlbumByUserId = async ({ userId, lastReceivedAlbumId }) => {
  console.log(lastReceivedAlbumId)
  return await Album.findAll({
    where: {
      user_id: userId,
      is_public: true,
      aid: {
        [Op.gt]: lastReceivedAlbumId
      }
    },
    include: [
      {
        model: Users,
        attributes: ['uid', 'name']
      },
      {
        model: Photos,
        where: {
          pid: {
            [Op.in]: [
              sequelize.literal(
                'SELECT pid FROM (SELECT album_id,min(pid) as pid,image_link from photos group by album_id)'
              )
            ]
          }
        },
        attributes: ['pid', 'image_link']
      }
    ],
    order: [['aid', 'asc']],
    limit: 50
  })
}
