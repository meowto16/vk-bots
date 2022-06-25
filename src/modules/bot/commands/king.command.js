import plural from 'plural-ru'

import Configuration from '../../../core/utils/classes/Configuration.js'
import NexiaService from '../../nexias/Nexia.service.js'

import createReplyChain from '../utils/createReplyChain.js'
import UserService from '../../users/User.service.js'
import getRandomArrayElement from '../../../core/utils/functions/getRandomArrayElement.js'

const kingCommand = async (ctx) => {
  const bestNexia = await NexiaService.getWithMaxCount()
  
  if (!bestNexia) {
    return ctx.reply('Не было найдено ни одного фото!')
  }

  const king = await UserService.getById({ user_id: bestNexia.belongs_to_user_id })
  
  const { profiles } = await ctx.bot.execute('messages.getConversationMembers', {
    peer_id: Configuration.vkPeerId,
  })

  const kingProfile = (profiles || []).find(profile => `${profile.id}` === `${king?.vk_login}`)

  if (!kingProfile) {
    return ctx.reply('Не найден владелец королевской нексии! Возможно его уже нет в этом чате')
  }

  const nexiaCount = [
    plural(bestNexia.count, getRandomArrayElement([
      ['ошеломительная', 'ошеломительные'],
      ['невероятная', 'невероятные'],
      ['великая', 'великие'],
      ['сумасшедшая', 'сумасшедшие'],
      ['замечательная', 'замечательные'],
    ])),
    bestNexia.count,
    plural(bestNexia.count, 'нексия', 'нексии', 'нексий')
  ].join(' ')

  return ctx.reply(
    'Найден король нексий 😎\n\n'
    + `👑 Автор: ${kingProfile.first_name} ${kingProfile.last_name}\n`
    + `💎 Счет: ${nexiaCount}!`,
    bestNexia.image
  )
}

export default kingCommand
