import Migration from './classes/Migration.js'

class CreateMigrationsTableMigration extends Migration {
    async up(pool) {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS migrations (
                migration_name VARCHAR(255) UNIQUE NOT NULL
            )
        `)
    }

    async down(pool) {
        await pool.query(`
            DROP TABLE IF EXISTS migrations
        `)
    }
}

export default CreateMigrationsTableMigration