const createReplyChain = (ctx) => {
  const step = 200
  let delay = 0

  function reply(...params) {
    setTimeout(() => {
      ctx.reply(...params)
    }, delay)

    delay += step

    return {
      reply
    }
  }
  
  return {
    reply
  }
}

export default createReplyChain