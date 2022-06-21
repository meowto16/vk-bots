import addNexiaCommand from './add-nexia.command.js'
import syncUsersCommand from './sync-users.command.js'
import ratingCommand from './rating.command.js'
import helpCommand from './help.command.js'
import reportCommand from './report.command.js'
import checkLohCommand from './check-loh.command.js'
import rollCommand from './roll.command.js'
import giftCommand from './gift.command.js'
import justiceCommand from './justice.command.js'
import kingCommand from './king.command.js'

export const CommandType = {
  SYNC_USERS: '/sync-users',
  RATING: '/rating',
  HELP: '/help',
  REPORT: '/report',
  CHECK_LOH: '/check-loh',
  ROLL: '/roll',
  GIFT: '/gift',
  JUSTICE: '/justice',
  KING: '/king',
}

const addNexiaCommands = {
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

export const addNexiaKeys = Object.keys(addNexiaCommands)

export const CommandMap = {
  [CommandType.SYNC_USERS]: syncUsersCommand,
  [CommandType.RATING]: ratingCommand,
  [CommandType.HELP]: helpCommand,
  [CommandType.REPORT]: reportCommand,
  [CommandType.CHECK_LOH]: checkLohCommand,
  [CommandType.ROLL]: rollCommand,
  [CommandType.GIFT]: giftCommand,
  [CommandType.JUSTICE]: justiceCommand,
  [CommandType.KING]: kingCommand,
  ...addNexiaCommands,
}