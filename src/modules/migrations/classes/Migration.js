import {MIGRATIONS_TABLE_NAME, MIGRATIONS_TABLE_NAME_COLUMN} from "../constants/base.js";

class Migration {
    constructor(migrationName) {
        this.migrationName = migrationName
    }

    async up(client) {
        throw new Error('Up migration is not implemented')
    }

    async down(client) {
        throw new Error('Down migration is not implemented')
    }

    async remember(client) {
        return client.query(`
            INSERT INTO ${MIGRATIONS_TABLE_NAME} (${MIGRATIONS_TABLE_NAME_COLUMN})
            VALUES ($1)
        `, [this.migrationName])
    }

    async forget(client) {
        return client.query(`
            DELETE FROM ${MIGRATIONS_TABLE_NAME}
            WHERE ${MIGRATIONS_TABLE_NAME_COLUMN} = $1
        `, [this.migrationName])
    }
}

export default Migration