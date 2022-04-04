import validator from 'express-validator'

/**
 *
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 */
const validateMiddleware = (req, res, next) => {
  const result = validator.validationResult(req)
  const hasErrors = !result.isEmpty()

  if (hasErrors) {
    res.statusCode = 400
    res.json(result.mapped())
  } else {
    next()
  }
}

export default validateMiddleware