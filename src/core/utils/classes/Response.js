class Response {
  static #answer(res, statusCode, data) {
    res.statusCode = statusCode

    return data
      ? res.json(data)
      : res.end()
  }

  static #error(res, statusCode, req, error = '') {
    return res.status(statusCode).json({
      code: statusCode,
      ...(error && {
        error,
      }),
      payload: {
        query: req.query,
        body: req.body,
        params: req.params,
      }
    })
  }
  
  static OK(res, data) {
    return Response.#answer(res, 200, data)
  }

  static CREATED(res, data = null) {
    return Response.#answer(res, 201, data)
  }
    
  static BAD_REQUEST(res, req, error) {
    return Response.#error(res, 400, req, error)
  }

  static UNAUTHORIZED(res, req, error) {
    return Response.#error(res, 401, req, error)
  }

  static FORBIDDEN(res, req, error) {
    return Response.#error(res, 403, req, error)
  }

  static NOT_FOUND(res, req, error) {
    return Response.#error(res, 404, req, error)
  }

  static INTERNAL_SERVER_ERROR(res) {
    return Response.#error(res, 500)
  }
}

export default Response