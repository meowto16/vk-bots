import express from 'express'

import NexiaController from './Nexia.controller.js'
import NexiaSchema from './Nexia.schema.js'
import validateMiddleware from '../../core/middlewares/validateMiddleware.js'

const router = express.Router()

router.get('', NexiaController.get)
router.get(
  '/:nexia_id',
  new NexiaSchema(['nexia_id']).checkSchema(),
  validateMiddleware,
  NexiaController.getById
)
router.post(
  '',
  new NexiaSchema(['count', 'image', 'belongs_to_user_id']).checkSchema(),
  validateMiddleware,
  NexiaController.create
)
router.put(
  '/:nexia_id',
  new NexiaSchema(['nexia_id', 'count', 'image', 'belongs_to_user_id']).checkSchema(),
  validateMiddleware,
  NexiaController.update
)
router.delete(
  '/:nexia_id',
  new NexiaSchema(['nexia_id']).checkSchema(),
  validateMiddleware,
  NexiaController.delete
)

const NexiaRouter = {
  base: '/nexias',
  router,
}

export default NexiaRouter