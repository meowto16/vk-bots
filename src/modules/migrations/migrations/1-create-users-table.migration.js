import Migration from "../classes/Migration.js";

class CreateUsersTableMigration extends Migration {
    async up(client) {
        await client.query('SELECT NOW()')
    }

    async down(client) {
        await client.query('SELECT NOW()')
    }
}

export default CreateUsersTableMigration