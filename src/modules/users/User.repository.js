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

  async create({ vk_login }) {
    await this.client.query(`
      INSERT INTO users(vk_login)
      VALUES ($1)
    `, [vk_login])
  }

  async update({ user_id, payload }) {
    await this.client.query(`
      UPDATE users
      SET vk_login = $2
      WHERE user_id = $1
    `, [user_id, payload.vk_login])
  }

  async delete({ user_id }) {
    await this.client.query(`
      DELETE FROM users 
      WHERE user_id = $1
    `, [user_id])
  }
}

export default UserRepository