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
    ERR_MIGRATION_DIRECTOR_LOAD_MIGRATIONS, ERR_MIGRATION_DIRECTOR_LOAD_MIGRATIONS_FROM_DATABASE
} from "../constants/error.js";

import MigrationError from "./MigrationError.js";

class MigrationManager {
    constructor() {
        this.pool = null
        this.client = null
        this.initialMigration = null
        this.migrations = []
        this.migrationsFromDatabase = {}
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

        await this.loadMigrationsFromDatabase()
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
            this.migrations = paths.map((file) => ({
                filename: file,
                migrationName: file.split('.migration.js')[0],
                order: +file.split('-')[0],
                migration: import(path.resolve(MIGRATIONS_DIR, file))
            }))
                .sort((a, b) => a.order - b.order)

            this.initialMigration = this.migrations.find(migration => migration.migrationName === initialMigration)
            this.migrations = this.migrations.filter(migration => migration.migrationName !== initialMigration)
        } catch (error) {
            throw new MigrationError(ERR_MIGRATION_DIRECTOR_LOAD_MIGRATIONS, error)
        }
    }

    async loadMigrationsFromDatabase() {
        try {
            const response = await this.client.query(`
                SELECT ${MIGRATIONS_TABLE_NAME_COLUMN} FROM ${MIGRATIONS_TABLE_NAME}`
            )

            this.migrationsFromDatabase = response.rows.reduce((acc, { migration_name }) => {
                acc[migration_name] = true
                return acc
            }, {})
        } catch (error) {
            throw new MigrationError(ERR_MIGRATION_DIRECTOR_LOAD_MIGRATIONS_FROM_DATABASE, error)
        }
    }

    async runMigrations({
        onMigrationSuccess,
        onMigrationFailed,
        onMigrationExist
    }) {
        for (const item of this.migrations) {
            if (this.migrationsFromDatabase[item.migrationName]) {
                onMigrationExist?.(item)
                continue
            }

            const { default: MigrationClass } = await item.migration
            const migration = new MigrationClass(item.migrationName)

            try {
                await migration.up(this.client)
                await migration.remember(this.client)
                onMigrationSuccess?.(item)
            } catch (error) {
                onMigrationFailed?.(item, error)
            }
        }
    }

    async runInitialMigration() {
        if (!this.initialMigration) {
            throw new MigrationError(ERR_MIGRATION_DIRECTOR_INITIAL_MIGRATION_RUN_NOT_FOUND)
        }

        try {
            const { default: MigrationClass } = await this.initialMigration.migration
            const migration = new MigrationClass(this.initialMigration.migrationName)
            await migration.up(this.client)
            await migration.remember(this.client)
        } catch (error) {
            throw new MigrationError(ERR_MIGRATION_DIRECTOR_INITIAL_MIGRATION_RUN, error)
        }
    }
}

export default MigrationManager