import Migration from '../classes/Migration.js'

class AddMessageTableMigration extends Migration {
  async up(client) {
    await client.query(`
      CREATE TABLE messages (
          message_id INT NOT NULL PRIMARY KEY,
          user_id UUID NOT NULL,
          nexia_id UUID NOT NULL,
          CONSTRAINT fk_user_id_messages
            FOREIGN KEY (user_id)
                REFERENCES users (user_id),
          CONSTRAINT fk_nexia_id_messages
              FOREIGN KEY (nexia_id)
              REFERENCES nexias (nexia_id)             
      );

      ALTER TABLE nexias
      DROP CONSTRAINT fk_belongs_to_user_id;

      INSERT INTO messages (message_id, user_id, nexia_id)
      SELECT
        floor(random()* (-1-(-2147483647) + 1) + (-2147483647)) AS message_id,
        belongs_to_user_id AS user_id,
        nexia_id
      FROM nexias;

      ALTER TABLE nexias
      DROP COLUMN belongs_to_user_id;
      
      ALTER TABLE nexias
      ADD COLUMN message_id INT;

      ALTER TABLE nexias
      ADD CONSTRAINT fk_message_id_nexias
        FOREIGN KEY (message_id)
        REFERENCES messages (message_id);

      UPDATE nexias
      SET message_id = messages.message_id
      FROM messages
      WHERE nexias.nexia_id = messages.nexia_id;
    `)
  }

  async down(client) {
    await client.query(`
      ALTER TABLE nexias
      ADD COLUMN belongs_to_user_id UUID;

      UPDATE nexias
      SET belongs_to_user_id = messages.user_id
      FROM messages
      WHERE nexias.nexia_id = messages.nexia_id;

      ALTER TABLE nexias
      ALTER COLUMN belongs_to_user_id SET NOT NULL;

      ALTER TABLE nexias
      ADD CONSTRAINT fk_belongs_to_user_id
        FOREIGN KEY (belongs_to_user_id)
          REFERENCES users (user_id) ON DELETE CASCADE;

      ALTER TABLE nexias
      DROP COLUMN message_id;

      DROP TABLE messages;
    `)
  }
}

export default AddMessageTableMigration
