import { Router } from 'express'
import * as userController from '../controllers/user.controller'

const router = Router()

router.post('/register', userController.register)

router.post('/login', userController.login)

export default router
