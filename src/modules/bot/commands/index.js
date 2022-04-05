import addNexiaCommand from './add-nexia.command.js'
import syncUsersCommand from './sync-users.command.js'

export const CommandType = {
  SYNC_USERS: '/sync-users'
}

export const CommandMap = {
  [CommandType.SYNC_USERS]: syncUsersCommand,
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