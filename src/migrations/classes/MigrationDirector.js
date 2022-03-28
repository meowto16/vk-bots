import pg from 'pg'
import 'dotenv/config'
import fs from "fs";
import {MIGRATIONS_DIR} from "../constants/base.js";
import path from "path";


class MigrationDirector {
    constructor() {
        this.pool = null
        this.foundMigration = false
    }

    async connect() {
        this.pool = new pg.Pool({})
        await this.pool.connect()
    }

    async close() {
        await this.pool.end()
    }

    async findMigrationByName(migrationName) {
        const response = await this.pool.query(`
            SELECT COUNT(migration_name)
            FROM "migrations"
            WHERE migration_name = $1
        `, [migrationName])

        console.log(response)
    }

    async checkMigrationTableExist() {
        const response = await this.pool.query(`
            SELECT EXISTS (
               SELECT 1
               FROM   information_schema.tables 
               WHERE  table_schema = 'public'
               AND    table_name = 'migrations'
            );
        `)
    }

    getMigrationsList() {
        return fs.readdirSync(MIGRATIONS_DIR)
            .filter(file => file.endsWith('.migration.js'))
            .map(file => ({
                filename: file,
                migrationName: file.split('.migration.js')[0],
                order: +file.split('-')[0],
                migration: (async () => {
                    const filepath = path.resolve(MIGRATIONS_DIR, file)
                    const { default: migration } = await import(filepath)

                    return migration
                })()
            }))
            .sort((a, b) => a.order - b.order)
    }

    //
    // async #beforeMigration(migrationName) {
    //
    //     const response = await this.pool.query(`
    //         SELECT COUNT(migration_name)
    //         FROM "migrations"
    //         WHERE migration_name = $1
    //     `, [migrationName])
    //
    //     this.foundMigration = Boolean(response.rows[0].count)
    // }
    //
    // async migrate(migrationName) {
    //     await this.#beforeMigration(migrationName)
    //
    //     if (!this.foundMigration) {
    //         await this.up(this.pool);
    //     }
    //
    //     await this.#afterMigration(migrationName)
    // }
    //
    // async #afterMigration(migrationName) {
    //     if (!this.foundMigration) {
    //         await this.pool.query(`
    //             INSERT INTO migrations(migration_name)
    //             VALUES ($1)
    //         `, [migrationName])
    //     }
    // }
}

export default MigrationDirector