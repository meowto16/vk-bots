import Migration from '../classes/Migration.js'

class EnableExtensionsUuidOsspMigration extends Migration {
    async up(client) {
        await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    }

    async down(client) {
        await client.query(`DROP EXTENSION "uuid-ossp"`)
    }
}

export default EnableExtensionsUuidOsspMigration
