class RepositoryError extends Error {
  constructor({ message, code }, error = {}) {
    super(message)
    this.error = error
    this.code = code
  }
}

export default RepositoryError