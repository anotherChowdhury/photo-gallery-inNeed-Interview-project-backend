import * as albumService from '../services/album.service'
import ErrorWithStatus from '../services/error.service'
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '../constants'
import Photos from '../models/photos.model'

export const addAlbum = async (req, res, next) => {
  const { name, description, is_public } = req.body
  try {
    if (!name || !description) throw new ErrorWithStatus('name,description fields are required', 400)

    const album = await albumService.addAlbum({ name, description, user_id: req.userId, is_public })

    return res.status(201).json({
      album
    })
  } catch (err) {
    next(err)
  }
}

export const publicAlbums = async (req, res, next) => {
  const args = {}
  const token = req.headers.authorization
  if (token) {
    try {
      const { userId } = jwt.verify(token, ACCESS_TOKEN_SECRET)
      console.log(userId)
      args.userId = userId
    } catch {
      console.log(err)
    }
  }

  console.log(req.query)
  let { lastReceivedId } = req.query
  if (lastReceivedId == 'undefined') lastReceivedId = 0
  console.log(lastReceivedId)

  args.lastReceivedAlbumId = lastReceivedId

  try {
    const albums = await albumService.getAllPublicAlbums(args)

    if (!albums.length) throw new ErrorWithStatus('No Album Found', 400)

    return res.status(200).json({ albums })
  } catch (err) {
    next(err)
  }
}

export const allAlbumsByUser = async (req, res, next) => {
  let { lastRecivedId } = req.query
  if (!lastRecivedId) lastRecivedId = 0
  try {
    const albums = await albumService.getAllAlbumsByUserId({ userId: req.userId, lastRecivedAlbumId: lastRecivedId })

    if (!albums.length) throw new ErrorWithStatus('No Albums Found', 400)

    return res.status(200).json({
      albums
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export const allPublicAlbumsByUser = async (req, res, next) => {
  console.log(req.query)
  let { lastReceivedId } = req.query
  if (lastReceivedId == 'undefined') lastReceivedId = 0
  const { userId } = req.params

  try {
    const albums = await albumService.getAllPublicAlbumByUserId({ userId, lastReceivedAlbumId: lastReceivedId })

    if (!albums.length) throw new ErrorWithStatus('No Albums Found', 400)

    return res.status(200).json({ albums })
  } catch (err) {
    next(err)
  }
}

export const getAlbum = async (req, res, next) => {
  const { albumId } = req.params
  let userId = ''

  const token = req.headers.authorization
  if (token) {
    try {
      const data = jwt.verify(token, ACCESS_TOKEN_SECRET)
      userId = data.userId
    } catch (err) {
      console.log(err)
    }
  }

  try {
    const album = await albumService.getAnAlbum({
      where: { aid: albumId },
      include: [Photos]
    })

    if (!album) throw new ErrorWithStatus('No Album Found', 404)

    if (!album.is_public && album.user_id !== userId) throw new ErrorWithStatus('This album is private', 400)

    return res.status(200).json({
      album
    })
  } catch (err) {
    next(err)
  }
}

export const updateAlbum = async (req, res, next) => {
  const { albumId } = req.params
  const { name, description } = req.body
  if (!name && !description) throw new ErrorWithStatus('name or description is field is required', 400)

  try {
    const album = await albumService.getAlbumById(albumId)

    if (album.user_id != req.userId) throw new ErrorWithStatus('Not Allowed', 400)

    if (name) album.name = name
    if (description) album.description = description

    const updated = await album.save()

    return res.status(200).json({ album: updated })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export const deleteAlbum = async (req, res, next) => {
  const { id } = req.params

  try {
    const album = await albumService.getAlbumById(id)

    if (album.user_id !== req.userId) throw new ErrorWithStatus('Not Allowed', 400)

    await albumService.removeAlbum(album)

    return res.status(200).send()
  } catch (err) {
    next(err)
  }
}
