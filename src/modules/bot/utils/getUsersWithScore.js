import Configuration from '../../../core/utils/classes/Configuration.js'
import UserService from '../../users/User.service.js'

export const getUsersWithScore = async (ctx) => {
  const { profiles } = await ctx.bot.execute('messages.getConversationMembers', {
    peer_id: Configuration.vkPeerId,
  })
  const userRatingMap = await UserService.getUsersScoreMap()

  const users = profiles
    .map(profile => ({
      id: profile.id,
      firstName: profile.first_name,
      lastName: profile.last_name,
      score: userRatingMap[profile.id] || 0
    }))
    .sort((a, b) => b.score - a.score)

  return users
}