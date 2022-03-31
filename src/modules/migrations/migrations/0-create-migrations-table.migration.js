import Migration from '../classes/Migration.js'

import { MIGRATIONS_TABLE_NAME, MIGRATIONS_TABLE_NAME_COLUMN } from "../constants/base.js";

class CreateMigrationsTableMigration extends Migration {
    async up(client) {
        await client.query(`
            CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE_NAME} (
                ${MIGRATIONS_TABLE_NAME_COLUMN} VARCHAR(255) UNIQUE NOT NULL
            )
        `)
    }

    async down(client) {
        await client.query(`
            DROP TABLE IF EXISTS ${MIGRATIONS_TABLE_NAME}
        `)
    }
}

export default CreateMigrationsTableMigration