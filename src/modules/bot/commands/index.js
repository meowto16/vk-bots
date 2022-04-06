import addNexiaCommand from './add-nexia.command.js'
import syncUsersCommand from './sync-users.command.js'
import ratingCommand from './rating.command.js'
import helpCommand from './help.command.js'
import reportCommand from './report.command.js'

export const CommandType = {
  SYNC_USERS: '/sync-users',
  RATING: '/rating',
  HELP: '/help',
  REPORT: '/report'
}

export const CommandMap = {
  [CommandType.SYNC_USERS]: syncUsersCommand,
  [CommandType.RATING]: ratingCommand,
  [CommandType.HELP]: helpCommand,
  [CommandType.REPORT]: reportCommand,
  '/1': addNexiaCommand,
  '/2': addNexiaCommand,
  '/3': addNexiaCommand,
  '/4': addNexiaCommand,
  '/5': addNexiaCommand,
  '/6': addNexiaCommand,
  '/7': addNexiaCommand,
  '/8': addNexiaCommand,
  '/9': addNexiaCommand,
  '/10': addNexiaCommand,
  '/11': addNexiaCommand,
  '/12': addNexiaCommand,
  '/13': addNexiaCommand,
  '/14': addNexiaCommand,
  '/15': addNexiaCommand,
  '/16': addNexiaCommand,
  '/17': addNexiaCommand,
  '/18': addNexiaCommand,
  '/19': addNexiaCommand,
  '/20': addNexiaCommand,
}