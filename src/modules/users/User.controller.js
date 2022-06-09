import Controller from '../../core/classes/Controller.js'
import Response from '../../core/utils/classes/Response.js'

import UserService from './User.service.js'

class UserController extends Controller {
  static async get(req, res) {
    const users = await UserService.get()

    return Response.OK(res, users)
  }

  static async getByVkLogin(req, res) {
    const user = await UserService.getByVkLogin({ vk_login: req.params.vk_login })

    if (!user) {
      return Response.NOT_FOUND(res, req, 'User not found')
    }

    return Response.OK(res, user)
  }

  static async create(req, res) {
    const createdUser = await UserService.create({ vk_login: req.body.vk_login })

    return Response.CREATED(res, createdUser)
  }

  static async update(req, res) {
    const updatedUser = await UserService.update({
      user_id: req.params.user_id,
      payload: { vk_login: req.body.vk_login }
    })

    if (!updatedUser) {
      return Response.NOT_FOUND(res, req, 'User not found')
    }

    return Response.OK(res, updatedUser)
  }

  static async delete(req, res) {
    const deletedUser = await UserService.delete({ user_id: req.params.user_id })

    if (!deletedUser) {
      return Response.NOT_FOUND(res, req, 'User not found')
    }

    return Response.OK(res, deletedUser)
  }
}

export default UserController