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

    await userRepository.create({ vk_login })
    const createdUser = await userRepository.getByVkLogin(vk_login)

    await userRepository.close()

    return createdUser
  }

  static async update({ user_id, payload }) {
    const userRepository = new UserRepository()
    await userRepository.connect()

    const userToUpdate = await userRepository.getByUserId(user_id)

    if (!userToUpdate) {
      return null
    }

    await userRepository.update({ user_id, payload })
    const updatedUser = await userRepository.getByUserId(user_id)

    await userRepository.close()

    return updatedUser
  }

  static async delete({ user_id }) {
    const userRepository = new UserRepository()
    await userRepository.connect()

    const userToDelete = await userRepository.getByUserId(user_id)

    if (!userToDelete) {
      return null
    }

    await userRepository.delete({ user_id })

    await userRepository.close()

    return { user_id }
  }
}

export default UserService