import Migration from '../classes/Migration.js'

class AddMessageIdColumnMigration extends Migration {
  async up(client) {
    await client.query(`
        ALTER TABLE nexias
        ADD COLUMN message_id INT DEFAULT floor(random()* (-1-(-2147483647) + 1) + (-2147483647)) NOT NULL UNIQUE
      `)
  }

  async down(client) {
    await client.query(`
      ALTER TABLE nexias
      DROP COLUMN message_id
    `)
  }
}

export default AddMessageIdColumnMigration
