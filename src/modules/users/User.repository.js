import Repository from '../../core/classes/Repository.js'

class UserRepository extends Repository {
  async get() {
    const { rows } = await this.client.query(`
        SELECT user_id, vk_login
        FROM users
    `)

    return rows
  }

  async getByUserId(user_id) {
    const { rows } = await this.client.query(`
      SELECT user_id, vk_login
      FROM USERS
      WHERE user_id = $1
    `, [user_id])

    return rows[0]
  }

  async getByVkLogin(vk_login) {
    const { rows } = await this.client.query(`
      SELECT user_id, vk_login
      FROM USERS
      WHERE vk_login = $1
    `, [vk_login])

    return rows[0]
  }

  async getUserNexiasByVkLogin({ vk_login }) {
    const { rows } = await this.client.query(`
      SELECT users.user_id, nexias.nexia_id, nexias.created_at, nexias.image, nexias.count
      FROM users
      JOIN nexias on users.user_id = nexias.belongs_to_user_id
      WHERE users.vk_login = $1
    `, [vk_login])

    return rows
  }

  async create({ vk_login }) {
    const { rows } = await this.client.query(`
      INSERT INTO users(vk_login)
      VALUES ($1)
      RETURNING user_id, vk_login
    `, [vk_login])

    return rows[0]
  }

  async update({ user_id, payload }) {
    const { rows } = await this.client.query(`
      UPDATE users
      SET vk_login = $2
      WHERE user_id = $1
      RETURNING user_id, vk_login
    `, [user_id, payload.vk_login])

    return rows[0]
  }

  async delete({ user_id }) {
    const { rows } = await this.client.query(`
      DELETE FROM users 
      WHERE user_id = $1
      RETURNING user_id
    `, [user_id])

    return rows[0]
  }
}

export default UserRepository