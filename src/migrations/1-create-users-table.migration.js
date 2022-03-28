import Migration from "./classes/Migration.js";

class CreateUsersTableMigration extends Migration {
    async up(pool) {
        console.log('up')
        await pool.query('SELECT NOW()')
    }

    async down(pool) {
        console.log('down')
        await pool.query('SELECT NOW()')
    }
}

export default CreateUsersTableMigration