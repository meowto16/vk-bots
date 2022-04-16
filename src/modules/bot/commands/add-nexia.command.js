import plural from 'plural-ru'

import userService from '../../users/User.service.js'
import nexiaService from '../../nexias/Nexia.service.js'
import createReplyChain from '../utils/createReplyChain.js'
import { congratsByScore } from '../utils/congratsByScore.js'
import { getUsersWithScore } from '../utils/getUsersWithScore.js'

const addNexiaCommand = async (ctx) => {
  const photos = (ctx.message?.attachments || []).filter(attachment => attachment.type === 'photo')

  if (photos.length === 0) {
    return ctx.reply('Без фото не принимаю')
  }

  if (photos.length > 1) {
    return ctx.reply('Принимаю только одно фото')
  }

  const photo = photos[0]

  const user = await userService.getByVkLogin({ vk_login: ctx.message.from_id })

  if (!user) {
    return ctx.reply('Я тебя не знаю. Необходимо синхронизировать участников. Команда /sync-users')
  }

  const count = +ctx.message.text.replace('/', '')

  const wSizedPhoto = photo.photo.sizes.find(size => size.type === 'w')
  const zSizedPhoto = photo.photo.sizes.find(size => size.type === 'z')
  const ySizedPhoto = photo.photo.sizes.find(size => size.type === 'z')

  const photoUrl = wSizedPhoto.url || zSizedPhoto.url || ySizedPhoto.url

  await nexiaService.create({
    image: photoUrl,
    count,
    belongs_to_user_id: user.user_id,
    message_id: ctx.message.conversation_message_id
  })

  const usersProfiles = await getUsersWithScore(ctx)
  const userProfile = usersProfiles.find(profile => +profile.id === +user.vk_login)

  const answer = createReplyChain(ctx)

  answer.reply(
    `✅ ОК
    - ${plural(count, 'Добавлена', 'Добавлено', 'Добавлены')} ${count} ${plural(count, 'нексия', 'нексии', 'нексий')} 
    - Твой счёт: ${userProfile.score}
  `)

  await congratsByScore(userProfile, answer)
}

export default addNexiaCommand