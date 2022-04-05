import nexiaCommand from './nexia.command.js'
import syncUsersCommand from './sync-users.command.js'

export const CommandType = {
  NEXIA: '/nexia',
  SYNC_USERS: '/sync-users'
}

export const CommandMap = {
  [CommandType.NEXIA]: nexiaCommand,
  [CommandType.SYNC_USERS]: syncUsersCommand,
}