import Controller from '../../core/classes/Controller.js'
import Response from '../../core/utils/classes/Response.js'
import UserService from '../users/User.service.js'

import NexiaService from './Nexia.service.js'

class NexiaController extends Controller {
  static async get(req, res) {
    const nexias = await NexiaService.get()
    
    return Response.OK(res, nexias)
  }

  static async getById(req, res) {
    const nexia = await NexiaService.getById({ nexia_id: req.params.nexia_id })

    if (!nexia) {
      return Response.NOT_FOUND(res, req, 'Nexia not found')
    }

    return Response.OK(res, nexia)
  }

  static async create(req, res) {
    const user = await UserService.getById({ user_id: req.body.belongs_to_user_id })

    if (!user) {
      return Response.BAD_REQUEST(res, req, 'User not found')
    }

    const createdNexia = await NexiaService.create({
      image: req.body.image,
      belongs_to_user_id: req.body.belongs_to_user_id,
      count: req.body.count,
    })

    return Response.CREATED(res, createdNexia)
  }

  static async update(req, res) {
    const user = await UserService.getById({ user_id: req.body.belongs_to_user_id })

    if (!user) {
      return Response.BAD_REQUEST(res, req, 'User not found')
    }

    const updatedNexia = await NexiaService.update({
      nexia_id: req.params.nexia_id,
      image: req.body.image,
      belongs_to_user_id: req.body.belongs_to_user_id,
      count: req.body.count,
    })

    if (!updatedNexia) {
      return Response.NOT_FOUND(res, req, 'Nexia with this nexia_id not found')
    }

    return Response.OK(res, updatedNexia)
  }

  static async delete(req, res) {
    const deletedNexia = await NexiaService.delete({ nexia_id: req.params.nexia_id })

    if (!deletedNexia) {
      return Response.NOT_FOUND(res, req, 'Nexia with this nexia_id not found')
    }

    return Response.OK(res, deletedNexia)
  }
}

export default NexiaController