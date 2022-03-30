import Migration from './classes/Migration.js'

import { MIGRATIONS_TABLE_NAME, MIGRATIONS_TABLE_NAME_COLUMN } from "./constants/base.js";

class CreateMigrationsTableMigration extends Migration {
    async up(pool) {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS $1 (
                $2 VARCHAR(255) UNIQUE NOT NULL
            )
        `, [MIGRATIONS_TABLE_NAME, MIGRATIONS_TABLE_NAME_COLUMN])
    }

    async down(pool) {
        await pool.query(`
            DROP TABLE IF EXISTS $1
        `, [MIGRATIONS_TABLE_NAME])
    }
}

export default CreateMigrationsTableMigration