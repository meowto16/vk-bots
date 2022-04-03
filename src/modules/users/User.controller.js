import Controller from '../../core/classes/Controller.js'
import UserService from './User.service.js'

class UserController extends Controller {
  static async get(req, res) {
    const users = await UserService.get()

    return res.json(users)
  }

  static async create(req, res) {
    const createdUser = await UserService.create({ vk_login: req.body.vk_login })

    res.statusCode = 201
    res.json(createdUser)
  }
}

export default UserController