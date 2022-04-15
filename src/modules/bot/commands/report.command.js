import NexiaService from '../../nexias/Nexia.service.js'
import Configuration from '../../../core/utils/classes/Configuration.js'
import plural from 'plural-ru'
import { AKIO_POLICE } from '../../../core/constants/stickers.js'
import UserService from '../../users/User.service.js'
import createReplyChain from '../utils/createReplyChain.js'

const reportCommand = async (ctx) => {
  if (!ctx.message.reply_message) {
    return ctx.reply('Нечего удалять. Необходимо переслать сообщение')
  }

  if ((ctx.message.reply_message.attachments || []).filter(attachment => attachment.type === 'photo').length === 0) {
    return ctx.reply('В пересланном сообщении нет фотографий. Выберите другое сообщение')
  }

  const nexia = await NexiaService.getByMessageId({
    message_id: ctx.message.reply_message.conversation_message_id
  })

  if (!nexia) {
    return ctx.reply('Не найдено. Возможно уже кто-то удалил..')
  }

  const { profiles } = await ctx.bot.execute('messages.getConversationMembers', {
    peer_id: Configuration.vkPeerId,
  })

  const userFromDatabase = await UserService.getById({ user_id: nexia.belongs_to_user_id })

  const user = (profiles || []).find(profile => `${profile.id}` === `${userFromDatabase.vk_login}`)

  if (!user) {
    return ctx.reply('Не удалось найти владельца..')
  }

  try {
    await NexiaService.delete({ nexia_id: nexia.nexia_id })
    const answer = createReplyChain(ctx)
    
    answer
      .reply('Успешно удалено')
      .reply(
        `[id${user.id}|${user.first_name} ${user.last_name}], кажется, ${plural(nexia.count, 'твою', 'твои')} `
          + `${plural(nexia.count, 'нексию', 'нексии')} удалили. `
          + 'Впредь, будь внимательнее на дорогах, и пристегни ремни.'
      )
      .reply('', null, null, AKIO_POLICE)
  } catch (e) {
    return ctx.reply('Не удалось удалить. Попробуйте снова.')
  }
}

export default reportCommand