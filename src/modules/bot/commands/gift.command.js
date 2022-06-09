import plural from 'plural-ru'

import { getUsersWithScore } from '../utils/getUsersWithScore.js'
import NexiaService from '../../nexias/Nexia.service.js'
import UserService from '../../users/User.service.js'
import createReplyChain from '../utils/createReplyChain.js'
import { AKIO_BIRTHDAY } from '../../../core/constants/stickers.js'

import { CommandType } from './index.js'

const giftCommand = async (ctx) => {
  if (!ctx.message.reply_message) {
    return ctx.reply('Не выбрана нексия, которую хотите подарить. Необходимо переслать сообщение')
  }

  const message = ctx.message.text.replace(CommandType.GIFT, '').trim()
  const recipientIdMatch = (message.match(/id[\d]+/) || [])[0]
  const recipientId = (recipientIdMatch || '').replace('id', '')
  
  if (!recipientId) {
    return ctx.reply('Не указан одариваемый. Необходимо указать в формате "/gift @пользователь_которому_хотите_подарить" и переслать сообщение')
  }

  const nexia = await NexiaService.getByMessageId({
    message_id: ctx.message.reply_message.conversation_message_id
  })

  if (!nexia) {
    return ctx.reply('Не удалось подарить нексию. Такая нексия не найдена...')
  }

  const [nexiaOwner, recipient, users] = await Promise.all([
    UserService.getById({ user_id: nexia.belongs_to_user_id }),
    UserService.getByVkLogin({ vk_login: recipientId }),
    getUsersWithScore(ctx)
  ])

  const nexiaUserOwner = users.find(user => `${user.id}` === `${nexiaOwner.vk_login}`)
  const recipientUser = users.find(user => `${user.id}` === `${recipient.vk_login}`)

  if (!recipient || !recipientUser) {
    return ctx.reply('Не удалось найти того, кому нужно подарить нексию...')
  }
    
  if (!nexiaUserOwner) {
    return ctx.reply('Не удалось найти владельца нексии')
  }

  if (ctx.message.from_id !== nexiaUserOwner.id) {
    return ctx.reply(`Это не твоя нексия, ее нельзя подарить. Нексия принадлежит @${nexiaUserOwner.nickname}`)
  }

  if (ctx.message.from_id === recipientUser.id) {
    return ctx.reply('Нельзя подарить нексию самому себе')
  }

  try {
    await NexiaService.changeOwner({ 
      nexia_id: nexia.nexia_id, 
      belongs_to_user_id: recipient.user_id 
    })

    const answer = createReplyChain(ctx)

    const from = `[id${nexiaUserOwner.id}|${nexiaUserOwner.firstName} ${nexiaUserOwner.lastName}]`
    const to = `[id${recipientUser.id}|${recipientUser.firstName} ${recipientUser.lastName}]`
    const gift = plural(nexia.count, 'свою нексию', `свои ${nexia.count} нексии`, `свои ${nexia.count} нексий`)
    answer
      .reply(`🎉 Ого, ${from} дарит ${to} ${gift}`)
      .reply('', null, null, AKIO_BIRTHDAY)

  } catch (e) {
    return ctx.reply('Не удалось подарить нексию. Неизвестная ошибка.')
  }
}

export default giftCommand
