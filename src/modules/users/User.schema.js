import Schema from '../../core/classes/Schema.js'

class UserSchema extends Schema {
  /**
   * @type {import('express-validator').ParamSchema}
   */
  vk_login = {
    in: ['params', 'body'],
    isString: true,
    notEmpty: true,
  }
}

export default UserSchema