import VkBot from 'node-vk-bot-api'

const BotInstance = new VkBot({
  token: process.env.VK_MESSAGES_API_KEY,
  group_id: +process.env.VK_GROUP_ID,
  confirmation: process.env.VK_MESSAGES_CONFIRMATION,
})

console.log('once')

export default BotInstance