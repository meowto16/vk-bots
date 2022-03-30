import pg from 'pg'
import path from "path";

import 'dotenv/config'

import {MIGRATIONS_DIR, MIGRATIONS_TABLE_NAME, MIGRATIONS_TABLE_NAME_COLUMN} from "../constants/base.js";
import {ERR_MIGRATION_DIRECTOR_CLOSE, ERR_MIGRATION_DIRECTOR_CONNECT, ERR_MIGRATION_INIT} from "../constants/error.js";

import MigrationError from "./MigrationError.js";

class MigrationDirector {
    constructor() {
        this.pool = null
        this.initialMigration = null
        this.migrations = []
        this.migrationsFromDatabase = null
    }

    async connect() {
        try {
            this.pool = new pg.Pool({})
            await this.pool.connect()
        } catch (error) {
            throw new MigrationError(ERR_MIGRATION_DIRECTOR_CONNECT, error)
        }
    }

    async close() {
        try {
            await this.pool.end()
        } catch (error) {
            throw new MigrationError(ERR_MIGRATION_DIRECTOR_CLOSE, error)
        }
    }

    async init() {
        try {

        } catch (error) {
            throw new MigrationError(ERR_MIGRATION_INIT, error)
        }
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

    loadMigrations(paths, { initialMigration }) {
        this.migrations = paths.map(file => ({
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

        this.initialMigration = this.migrations.find(migration => migration.migrationName === initialMigration)
        this.migrations = this.migrations.filter(migration => migration.migrationName !== initialMigration)
    }

    async loadMigrationsFromDatabase() {
        const response = await this.pool.query(`
            SELECT $1 FROM $2`, [MIGRATIONS_TABLE_NAME_COLUMN, MIGRATIONS_TABLE_NAME]
        )
    }

    async runMigrations({
        onMigrationSuccess,
        onMigrationFailed,
        onMigrationExist,
        onMigrationsNotFound,
        onError
    }) {
        if (!this.migrationsFromDatabase) {
            onError?.('Load migrations from database firstly by running MigrationDirector.loadMigrationsFromDatabase()')
            return
        }

        if (!this.migrations.length) {
            onMigrationsNotFound?.()
            return this.migrations
        }

        for (const { migration } of this.migrations) {

            try {
                await migration.up()
                onMigrationSuccess?.()
            } catch (error) {
                onMigrationFailed?.(error)
            }
        }
    }

    async runInitialMigration({
        onMigrationSuccess,
        onMigrationFailed,
        onMigrationExist,
        onMigrationNotFound,
    }) {
        if (!this.initialMigration) {
            onMigrationNotFound?.()
            return this.initialMigration
        }

        if (this.initialMigration.migration.checkExist()) {

        }
    }
}

export default MigrationDirector