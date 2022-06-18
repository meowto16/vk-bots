const range = (from, to, step = 1) => {
  const min = Math.min(from, to)
  const max = Math.max(from, to)

  const result = []

  for (let i = min; i <= max; i += step) {
    result.push(i)
  }

  return result
}

export default range