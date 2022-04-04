import express from 'express'

import UserController from './User.controller.js'
import UserSchema from './User.schema.js'
import validateMiddleware from '../../core/middlewares/validateMiddleware.js'

const router = express.Router()

router.get('', UserController.get)
router.post(
  '',
  new UserSchema(['vk_login']).checkSchema(),
  validateMiddleware,
  UserController.create
)

const UserRouter = {
  base: '/users',
  router,
}

export default UserRouter