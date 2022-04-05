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

  static async getUserScore({ vk_login }) {
    const userRepository = new UserRepository()
    await userRepository.connect()

    const userNexias = await userRepository.getUserNexiasByVkLogin({ vk_login })

    await userRepository.close()

    return UserService.#calculateUserScore(userNexias)
  }

  static async getUsersScoreMap() {
    const userRepository = new UserRepository()
    await userRepository.connect()

    const nexiasRows = await userRepository.getUsersWithNexias()

    await userRepository.close()
    
    const userNexiaMap = nexiasRows.reduce((acc, row) => {
      if (!acc[row.vk_login]) {
        acc[row.vk_login] = []
      }

      acc[row.vk_login].push(row)

      return acc
    }, {})

    return Object
      .entries(userNexiaMap)
      .map(([id, nexias]) => [id, UserService.#calculateUserScore(nexias)])
      .reduce((acc, [id, score]) => {
        acc[id] = score

        return acc
      }, {})
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

  static #calculateUserScore(nexias = []) {
    return nexias.reduce((acc, { count }) => {
      acc += count

      return acc
    }, 0)
  }
}

export default UserService