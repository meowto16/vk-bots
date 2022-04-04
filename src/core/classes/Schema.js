import { checkSchema } from 'express-validator'

class Schema {
  constructor(validateFields = []) {
    this._fieldsToValidate = validateFields
  }

  checkSchema() {
    const schema = this._fieldsToValidate.reduce((acc, fieldName) => {
      const candidate = this[fieldName]

      if (candidate) {
        acc[fieldName] = candidate
      }

      return acc
    }, {})

    return checkSchema(schema)
  }
}

export default Schema