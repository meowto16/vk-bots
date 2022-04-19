const rollCommand = (ctx) => {
  const num = Math.round(Math.random() * 100)

  ctx.reply('Выпадает число: ' + num)
}

export default rollCommand
