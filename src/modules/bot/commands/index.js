import nexiaCommand from './nexia.command.js'

export const CommandType = {
  NEXIA: '/nexia'
}

export const CommandMap = {
  [CommandType.NEXIA]: nexiaCommand,
}