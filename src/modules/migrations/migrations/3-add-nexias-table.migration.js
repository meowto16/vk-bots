import Migration from '../classes/Migration.js'

class AddNexiasTableMigration extends Migration {
  async up(client) {
    await client.query(`
            CREATE TABLE nexias
            (
                nexia_id           UUID                     DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
                created_at         TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                image              VARCHAR(255) NOT NULL,
                count              SMALLINT     NOT NULL    DEFAULT 1,
                belongs_to_user_id UUID         NOT NULL,
                CONSTRAINT fk_belongs_to_user_id
                    FOREIGN KEY (belongs_to_user_id)
                        REFERENCES users (user_id)
            )
        `)
  }

  async down(client) {
    await client.query('DROP TABLE nexias')
  }
}

export default AddNexiasTableMigration
