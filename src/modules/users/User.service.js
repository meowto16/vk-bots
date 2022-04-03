import Service from '../../core/classes/Service.js'
import UserRepository from './User.repository.js'

class UserService extends Service {
  static async get() {
    const userRepository = new UserRepository()
    await userRepository.connect()

    const users = await userRepository.get()

    await userRepository.close()

    return users
  }

  static async create({ vk_login }) {
    const userRepository = new UserRepository()
    await userRepository.connect()

    const createdUser = await userRepository.create({ vk_login })

    await userRepository.close()

    return createdUser
  }
}

export default UserService