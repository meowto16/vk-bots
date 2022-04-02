import Repository from "../../core/repositories/classes/Repository.js";

class UserRepository extends Repository {
    async get() {
        const { rows } = await this.client.query(`SELECT user_id, vk_login FROM users`)

        return rows
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
        await this.client.query(`INSERT INTO users(vk_login) VALUES ($1)`, [vk_login])
        return await this.getByVkLogin(vk_login)
    }
}

export default UserRepository