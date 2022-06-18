import range from '../../../core/utils/functions/range.js'
import { addNexiaKeys, CommandType } from './index.js'
import addNexiaCommand from './add-nexia.command.js'
import NexiaService from '../../nexias/Nexia.service.js'

const justiceCommand = async (ctx) => {
  const NEED_MESSAGES_COUNT = 100

  const to = ctx.message.conversation_message_id
  const from = Math.max(0, ctx.message.conversation_message_id - (NEED_MESSAGES_COUNT - 1))

  const messagesIds = range(from, to)

  let messages

  try {
    const response = await ctx.bot.execute('messages.getByConversationMessageId', {
      conversation_message_ids: messagesIds,
      group_id: process.env.VK_GROUP_ID,
      peer_id: ctx.message.peer_id,
    })

    messages = response.items
  } catch (e) {
    return ctx.reply('❌ Не удалось получить сообщения')
  }

  const reportMessages = messages.filter(message => message.text.trim() === CommandType.REPORT && !!message.reply_message)
  const nexiaMessages = messages.filter(message => addNexiaKeys.includes(message.text.trim()))

  const ignoreNexias = new Set(reportMessages.map(reportMessage => reportMessage.reply_message.conversation_message_id))

  const lostNexias = nexiaMessages.filter((nexiaMessage) => !ignoreNexias.has(nexiaMessage.conversation_message_id))

  if (!lostNexias.length) {
    return ctx.reply('❌ Не найдено сообщений с добавлением нексий. Максимум последние 100 сообщений')
  }

  let addedNexias = false
  
  for (let message of lostNexias) {
    const found = Boolean(await NexiaService.getByMessageId({ message_id: message.conversation_message_id }))

    if (found) {
      continue
    }

    await addNexiaCommand({
      ...ctx,
      message,
      reply: ctx.reply.bind(ctx),
    })

    addedNexias = true
  }

  return addedNexias
    ? ctx.reply('🎉 Справедливость успешно восстановлена! Добавлены все пропащие нексии')
    : ctx.reply('🎉 Справедливость успешно восстановлена! Пропащих нексий не было найдено')
}

export default justiceCommand