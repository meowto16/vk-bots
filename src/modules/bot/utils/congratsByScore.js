import { SCORE_CONGRATULATIONS } from '../constants/reply.js'

export const congratsByScore = async (user, answer) => {
  const congratulations = SCORE_CONGRATULATIONS[user.score]
  if (!congratulations) return

  return answer
    .reply(congratulations.message.replace('$USER$', `[id${user.id}|${user.firstName} ${user.lastName}]`))
    .reply('', null, null, congratulations.sticker)
}