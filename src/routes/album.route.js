import { Router } from 'express'
import * as albumController from '../controllers/album.controller'
import checkAuth from '../middlewares/checkAuth'
const router = Router()

router.post('/', checkAuth, albumController.addAlbum)

router.get('/public', albumController.publicAlbums)

router.get('/user/all', checkAuth, albumController.allAlbumsByUser)

router.get('/user/:userId', albumController.allPublicAlbumsByUser)

router.get('/:albumId', albumController.getAlbum)

router.patch('/:albumId', checkAuth, albumController.updateAlbum)

router.delete('/:id', checkAuth, albumController.deleteAlbum)

export default router
