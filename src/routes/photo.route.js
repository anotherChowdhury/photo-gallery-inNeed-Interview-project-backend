import { Router } from 'express'
import upload from '../services/imageUpload.service'
import * as photoController from '../controllers/photo.controller'
import checkAuth from '../middlewares/checkAuth'
const router = Router()

router.post('/', checkAuth, upload.array('photos'), photoController.addPhotos)

// Create a get route maybe ?!?

router.delete('/:id', checkAuth, photoController.deletePhoto)

export default router
