import Migration from '../classes/Migration.js'

class AddUsersTableMigration extends Migration {
  async up(client) {
    await client.query(`
            CREATE TABLE users
            (
                user_id  UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
                vk_login VARCHAR(255)                    NOT NULL UNIQUE
            )`
    )
  }

  async down(client) {
    await client.query('DROP TABLE users')
  }
}

export default AddUsersTableMigration
