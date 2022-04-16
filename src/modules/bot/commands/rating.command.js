import { getUsersWithScore } from '../utils/getUsersWithScore.js'

const ratingCommand = async (ctx) => {
  const users = await getUsersWithScore(ctx)
  const totalScore = users.reduce((acc, user) => acc + +user.score, 0)

  ctx.reply(
    `🏆 Cписки лидеров:
${users.map((user) => `[${user.score}] ${user.firstName} ${user.lastName}`).join('\n')}
    
Всего нексий: ${totalScore}
`
  )
}

export default ratingCommand
