import express from 'express'
import BotInstance from './Bot.instance.js'

const router = express.Router()

router.post('', BotInstance.webhookCallback)

const BotRouter = {
  base: '/bot',
  router,
}

export default BotRouter