import Repository from '../../core/classes/Repository.js'

class NexiaRepository extends Repository {
  async get() {
    const { rows } = await this.client.query(`
        SELECT nexia_id, created_at, image, count, belongs_to_user_id, message_id
        FROM nexias
    `)

    return rows
  }

  async getById(nexia_id) {
    const { rows } = await this.client.query(`
        SELECT nexia_id, created_at, image, count, belongs_to_user_id, message_id
        FROM nexias
        WHERE nexia_id = $1
    `, [nexia_id])

    return rows[0]
  }

  async create({
    image,
    count,
    belongs_to_user_id,
    message_id,
  }) {
    const { rows } = await this.client.query(`
      INSERT INTO nexias(image, count, belongs_to_user_id, message_id)
      VALUES ($1, $2, $3, $4)
      RETURNING nexia_id, created_at, image, count, belongs_to_user_id, message_id
    `, [image, count, belongs_to_user_id, message_id])

    return rows[0]
  }

  async update({ nexia_id, image, count, belongs_to_user_id, message_id }) {
    const { rows } = await this.client.query(`
      UPDATE nexias
      SET image = $2, count = $3, belongs_to_user_id = $4, message_id = $5
      WHERE nexia_id = $1
      RETURNING nexia_id, created_at, image, count, belongs_to_user_id
    `, [nexia_id, image, count, belongs_to_user_id, message_id])

    return rows[0]
  }
  
  async delete({ nexia_id }) {
    const { rows } = await this.client.query(`
      DELETE FROM nexias 
      WHERE nexia_id = $1
      RETURNING nexia_id
    `, [nexia_id])

    return rows[0]
  }
}

export default NexiaRepository