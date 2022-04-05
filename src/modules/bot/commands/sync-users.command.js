import UserService from '../../users/User.service.js'
import Configuration from '../../../core/utils/classes/Configuration.js'

const syncUsersCommand = async (ctx) => {
  ctx.reply('Синхронизирую участников...')

  const { profiles } = await ctx.bot.execute('messages.getConversationMembers', {
    peer_id: Configuration.vkPeerId,
  })
  const users = await UserService.get()

  const missedUsers = profiles
    .filter(profile => {
      return users.findIndex(user => user.vk_login === profile.screen_name) === -1
    })
    .map(profile => ({
      vk_login: profile.screen_name
    }))

  for (const user of missedUsers) {
    await UserService.create(user)
  }

  if (missedUsers.length) {
    ctx.reply(`Были добавлены следующие участники: ${missedUsers.map(user => user.vk_login).join(', ')}`)
  } else {
    ctx.reply('Все присутствующие в чате уже добавлены.')
  }
}

export default syncUsersCommand