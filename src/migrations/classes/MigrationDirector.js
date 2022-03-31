import pg from 'pg'
import path from "path";

import 'dotenv/config'

import {
    INITIAL_MIGRATION_NAME,
    migrations,
    MIGRATIONS_DIR,
    MIGRATIONS_TABLE_NAME,
    MIGRATIONS_TABLE_NAME_COLUMN
} from "../constants/base.js";
import {
    ERR_MIGRATION_DIRECTOR_CHECK_MIGRATIONS_TABLE,
    ERR_MIGRATION_DIRECTOR_CLOSE,
    ERR_MIGRATION_DIRECTOR_CONNECT,
    ERR_MIGRATION_DIRECTOR_INITIAL_MIGRATION_RUN,
    ERR_MIGRATION_DIRECTOR_INITIAL_MIGRATION_RUN_NOT_FOUND,
    ERR_MIGRATION_DIRECTOR_LOAD_MIGRATIONS
} from "../constants/error.js";

import MigrationError from "./MigrationError.js";

class MigrationDirector {
    constructor() {
        this.pool = null
        this.client = null
        this.initialMigration = null
        this.migrations = []
        this.migrationsFromDatabase = null
    }

    async connect() {
        try {
            this.pool = new pg.Pool({})
            this.client = await this.pool.connect()
        } catch (error) {
            throw new MigrationError(ERR_MIGRATION_DIRECTOR_CONNECT, error)
        }
    }

    async close() {
        try {
            await this.client.release()
            return this.pool.end()
        } catch (error) {
            throw new MigrationError(ERR_MIGRATION_DIRECTOR_CLOSE, error)
        }
    }

    async init() {
        const isMigrationTableExist = await this.checkMigrationTableExist()
        this.loadMigrations(migrations, { initialMigration: INITIAL_MIGRATION_NAME })

        if (!isMigrationTableExist) {
            await this.runInitialMigration()
        }
    }

    async checkMigrationTableExist() {
        try {
            const { rows } = await this.client.query(`
                SELECT EXISTS (
                   SELECT 1
                   FROM   information_schema.tables 
                   WHERE  table_schema = 'public'
                   AND    table_name = 'migrations'
                );
            `)
            return rows[0].exists
        } catch (error) {
            throw new MigrationError(ERR_MIGRATION_DIRECTOR_CHECK_MIGRATIONS_TABLE, error)
        }
    }

    loadMigrations(paths, { initialMigration }) {
        try {
            this.migrations = paths.map(async (file) => ({
                filename: file,
                migrationName: file.split('.migration.js')[0],
                order: +file.split('-')[0],
                migration: await import(path.resolve(MIGRATIONS_DIR, file))
            }))
                .sort((a, b) => a.order - b.order)

            this.initialMigration = this.migrations.find(migration => migration.migrationName === initialMigration)
            this.migrations = this.migrations.filter(migration => migration.migrationName !== initialMigration)

            console.log(this.initialMigration)
        } catch (error) {
            throw new MigrationError(ERR_MIGRATION_DIRECTOR_LOAD_MIGRATIONS, error)
        }
    }

    async loadMigrationsFromDatabase() {
        const response = await this.client.query(`
            SELECT $1 FROM $2`, [MIGRATIONS_TABLE_NAME_COLUMN, MIGRATIONS_TABLE_NAME]
        )
    }

    async runMigrations() {
        // if (!this.migrationsFromDatabase) {
        //     onError?.('Load migrations from database firstly by running MigrationDirector.loadMigrationsFromDatabase()')
        //     return
        // }
        //
        // if (!this.migrations.length) {
        //     onMigrationsNotFound?.()
        //     return this.migrations
        // }
        //
        // for (const { migration } of this.migrations) {
        //
        //     try {
        //         await migration.up()
        //         onMigrationSuccess?.()
        //     } catch (error) {
        //         onMigrationFailed?.(error)
        //     }
        // }
    }

    async runInitialMigration() {
        if (!this.initialMigration) {
            throw new MigrationError(ERR_MIGRATION_DIRECTOR_INITIAL_MIGRATION_RUN_NOT_FOUND)
        }

        console.log(this.initialMigration)

        try {
            await this.initialMigration.migration.run()
        } catch (error) {
            throw new MigrationError(ERR_MIGRATION_DIRECTOR_INITIAL_MIGRATION_RUN, error)
        }
    }
}

export default MigrationDirector