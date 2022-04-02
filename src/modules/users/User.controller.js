import Controller from "../../core/controllers/classes/Controller.js";
import UserRepository from "./User.repository.js";

class UserController extends Controller {
    static async get(req, res) {
        const userRepository = new UserRepository()
        await userRepository.connect()

        const users = await userRepository.get()

        await userRepository.close()

        res.json(users)
    }

    static async create(req, res) {
        const userRepository = new UserRepository()
        await userRepository.connect()

        const createdUser = await userRepository.create({ vk_login: req.body.vk_login })

        await userRepository.close()

        res.statusCode = 201
        res.json(createdUser)
    }
}

export default UserController