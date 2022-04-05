import Schema from '../../core/classes/Schema.js'

class NexiaSchema extends Schema {
  /**
  * @type {import('express-validator').ParamSchema}
  */
  nexia_id = {
    in: ['body', 'params'],
    isUUID: true,
    notEmpty: true,
  }

  /**
   * @type {import('express-validator').ParamSchema}
   */
  count = {
    in: ['body', 'params'],
    isNumeric: true,
    notEmpty: true,
  }
    
  /**
  * @type {import('express-validator').ParamSchema}
  */
  belongs_to_user_id = {
    in: ['body'],
    isUUID: true,
    notEmpty: true,
  }

  /**
  * @type {import('express-validator').ParamSchema}
  */
  image = {
    in: ['body'],
    isURL: true,
    notEmpty: true,
  }
}

export default NexiaSchema