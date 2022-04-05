import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'

import Environment from './core/utils/classes/Environment.js'
import Configuration from './core/utils/classes/Configuration.js'
import Logger from './core/utils/classes/Logger.js'

import UserRouter from './modules/users/User.router.js'
import NexiaRouter from './modules/nexias/Nexia.router.js'
import BotRouter from './modules/bot/Bot.router.js'
import { bootstrap as bootstrapVkBot } from './modules/bot/bootstrap.js'

const app = express()

app.use(bodyParser.json())

app.use(UserRouter.base, UserRouter.router)
app.use(NexiaRouter.base, NexiaRouter.router)
app.use(BotRouter.base, BotRouter.router)

app.listen(Configuration.port, () => {
  Logger.info('Server running is running on...')
  Logger.info(Environment.getVariable({
    [Environment.DEVELOP_ENVIRONMENT]: `http://localhost:${Configuration.port}`,
    [Environment.PRODUCTION_ENVIRONMENT]: 'https://vk-bots.herokuapp.com'
  }))

  bootstrapVkBot()
})