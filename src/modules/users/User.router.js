import express from 'express'

import validateMiddleware from '../../core/middlewares/validateMiddleware.js'

import UserController from './User.controller.js'
import UserSchema from './User.schema.js'

const router = express.Router()

router.get('', UserController.get)
router.get(
  '/:vk_login',
  new UserSchema(['vk_login']).checkSchema(),
  validateMiddleware,
  UserController.getByVkLogin,
)
router.post(
  '',
  new UserSchema(['vk_login']).checkSchema(),
  validateMiddleware,
  UserController.create
)
router.put(
  '/:user_id',
  new UserSchema(['user_id', 'vk_login']).checkSchema(),
  validateMiddleware,
  UserController.update
)
router.delete(
  '/:user_id',
  new UserSchema(['user_id']).checkSchema(),
  validateMiddleware,
  UserController.delete
)

const UserRouter = {
  base: '/users',
  router,
}

export default UserRouter