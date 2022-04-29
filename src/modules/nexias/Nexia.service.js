import Service from '../../core/classes/Service.js'
import NexiaRepository from './Nexia.repository.js'

class NexiaService extends Service {
  static async get() {
    const nexiaRepository = new NexiaRepository()
    await nexiaRepository.connect()

    const nexias = await nexiaRepository.get()
      
    await nexiaRepository.close()

    return nexias
  }

  static async getById({ nexia_id }) {
    const nexiaRepository = new NexiaRepository()
    await nexiaRepository.connect()

    const foundNexia = await nexiaRepository.getById(nexia_id)

    await nexiaRepository.close()

    return foundNexia
  }

  static async getByMessageId({ message_id }) {
    const nexiaRepository = new NexiaRepository()
    await nexiaRepository.connect()

    const foundNexia = await nexiaRepository.getByMessageId(message_id)

    await nexiaRepository.close()

    return foundNexia
  }

  static async create({ image, count, belongs_to_user_id, message_id }) {
    const nexiaRepository = new NexiaRepository()
    await nexiaRepository.connect()

    const createdNexia = await nexiaRepository.create({ image, count, belongs_to_user_id, message_id })

    await nexiaRepository.close()

    return createdNexia
  }

  static async changeOwner({ nexia_id, belongs_to_user_id }) {
    const nexiaRepository = new NexiaRepository()
    await nexiaRepository.connect()

    const updatedNexia = await nexiaRepository.changeOwner({
      nexia_id,
      belongs_to_user_id,
    })

    await nexiaRepository.close()

    return updatedNexia
  }

  static async update({ nexia_id, image, count, belongs_to_user_id, message_id }) {
    const nexiaRepository = new NexiaRepository()
    await nexiaRepository.connect()

    const updatedNexia = await nexiaRepository.update({
      nexia_id,
      image,
      count,
      belongs_to_user_id,
      message_id
    })

    await nexiaRepository.close()

    return updatedNexia
  }

  static async delete({ nexia_id }) {
    const nexiaRepository = new NexiaRepository()
    await nexiaRepository.connect()

    const deletedNexia = await nexiaRepository.delete({ nexia_id })

    await nexiaRepository.close()

    return deletedNexia
  }
}

export default NexiaService