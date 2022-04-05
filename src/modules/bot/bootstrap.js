import Logger from '../../core/utils/classes/Logger.js'

import { CommandMap } from './commands/index.js'
import BotInstance from './Bot.instance.js'

export const bootstrap = () => {
  try {
    const entries = Object.entries(CommandMap)

    entries.forEach(([commandType, callback]) => {
      const loggedCallback = async (ctx) => {
        try {
          await callback(ctx)
          Logger.reply(commandType)
        } catch (err) {
          Logger.error(`Error while trying to reply on "${commandType}"`, err)
        }
      }

      BotInstance.command(commandType, loggedCallback)
    })

    Logger.success('BOT initialized all commands')
  } catch (err) {
    Logger.error('Error while trying to initialize bot commands', err)
  }
}

export default bootstrap