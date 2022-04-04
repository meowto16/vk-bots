import Schema from '../../core/classes/Schema.js'

class UserSchema extends Schema {
  /**
   * @type {import('express-validator').ParamSchema}
   */
  user_id = {
    in: ['params'],
    isUUID: true,
    notEmpty: true
  }

  /**
   * @type {import('express-validator').ParamSchema}
   */
  vk_login = {
    in: ['params', 'body'],
    isString: true,
    notEmpty: true,
    isLength: {
      options: {
        min: 0,
        max: 255
      }
    }
  }
}

export default UserSchema