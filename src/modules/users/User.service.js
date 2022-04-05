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

  static async getById({ user_id }) {
    const userRepository = new UserRepository()
    await userRepository.connect()

    const user = await userRepository.getByUserId(user_id)

    await userRepository.close()

    return user
  }

  static async getByVkLogin({ vk_login }) {
    const userRepository = new UserRepository()
    await userRepository.connect()

    const user = await userRepository.getByVkLogin(vk_login)

    await userRepository.close()

    return user
  }

  static async create({ vk_login }) {
    const userRepository = new UserRepository()
    await userRepository.connect()

    const createdUser = await userRepository.create({ vk_login })

    await userRepository.close()

    return createdUser
  }

  static async update({ user_id, payload }) {
    const userRepository = new UserRepository()
    await userRepository.connect()

    const updatedUser = await userRepository.update({ user_id, payload })

    await userRepository.close()

    return updatedUser
  }

  static async delete({ user_id }) {
    const userRepository = new UserRepository()
    await userRepository.connect()

    const deletedUser = await userRepository.delete({ user_id })

    await userRepository.close()

    return deletedUser
  }
}

export default UserService