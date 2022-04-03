import express from 'express'
import UserController from './User.controller.js'

const router = express.Router()

router.get('', UserController.get)
router.post('', UserController.create)

const UserRouter = {
  base: '/users',
  router,
}

export default UserRouter