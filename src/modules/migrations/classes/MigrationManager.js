import pg from 'pg'
import path from 'path'

import 'dotenv/config'

import {
  INITIAL_MIGRATION_NAME,
  migrations,
  MIGRATIONS_DIR,
  MIGRATIONS_TABLE_NAME,
  MIGRATIONS_TABLE_NAME_COLUMN
} from '../constants/base.js'
import {
  ERR_MIGRATION_DIRECTOR_CHECK_MIGRATIONS_TABLE,
  ERR_MIGRATION_DIRECTOR_CLOSE,
  ERR_MIGRATION_DIRECTOR_CONNECT,
  ERR_MIGRATION_DIRECTOR_DOWN_LAST_MIGRATION,
  ERR_MIGRATION_DIRECTOR_DOWN_LAST_MIGRATION_NOT_FOUND,
  ERR_MIGRATION_DIRECTOR_INITIAL_MIGRATION_RUN,
  ERR_MIGRATION_DIRECTOR_INITIAL_MIGRATION_RUN_NOT_FOUND,
  ERR_MIGRATION_DIRECTOR_LOAD_MIGRATIONS,
  ERR_MIGRATION_DIRECTOR_LOAD_MIGRATIONS_FROM_DATABASE,
  ERR_MIGRATION_DIRECTOR_RUN_MIGRATIONS
} from '../constants/error.js'

import MigrationError from './MigrationError.js'
import { poolSettings } from '../../../core/constants/connect.js'

class MigrationManager {
  constructor() {
    this.pool = null
    this.client = null
    this.initialMigration = null
    this.migrations = []
    this.migrationsFromDatabase = {
      byKey: {},
      arr: [],
    }
  }

  async connect() {
    try {
      this.pool = new pg.Pool(poolSettings)
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
    const isMigrationTableExist = await this.#checkMigrationTableExist()
    this.#loadMigrations(migrations, { initialMigration: INITIAL_MIGRATION_NAME })

    if (!isMigrationTableExist) {
      await this.#runInitialMigration()
    }

    await this.#loadMigrationsFromDatabase()
  }

  async runMigrations({
    onMigrationSuccess,
    onMigrationFailed,
    onMigrationExist
  }) {
    try {
      for (const item of this.migrations) {
        if (this.migrationsFromDatabase.byKey[item.migrationName]) {
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
    } catch (error) {
      throw new MigrationError(ERR_MIGRATION_DIRECTOR_RUN_MIGRATIONS, error)
    }
  }

  async downLastMigration() {
    if (!this.migrationsFromDatabase.arr.length) {
      return
    }

    const allMigrations = [
      ...(this.initialMigration && [this.initialMigration]),
      ...(this.migrations.length && this.migrations)
    ]

    const lastMigrationName = this.migrationsFromDatabase.arr.slice(-1)[0]
    const lastMigrationItemIndex = allMigrations.findIndex(migration => migration.migrationName === lastMigrationName)

    if (lastMigrationItemIndex === -1) {
      throw new MigrationError(ERR_MIGRATION_DIRECTOR_DOWN_LAST_MIGRATION_NOT_FOUND)
    }

    try {
      const isInitialMigration = lastMigrationItemIndex === 0
      const lastMigrationItem = allMigrations[lastMigrationItemIndex]

      const { default: MigrationClass } = await lastMigrationItem.migration
      const migration = new MigrationClass(lastMigrationItem.migrationName)

      if (!isInitialMigration) {
        await migration.down(this.client)
        await migration.forget(this.client)
      }

      return !isInitialMigration && lastMigrationItem
    } catch (error) {
      throw new MigrationError(ERR_MIGRATION_DIRECTOR_DOWN_LAST_MIGRATION, error)
    }
  }

  async #runInitialMigration() {
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

  async #checkMigrationTableExist() {
    try {
      const { rows } = await this.client.query(`
                SELECT EXISTS(
                               SELECT 1
                               FROM information_schema.tables
                               WHERE table_schema = 'public'
                                 AND table_name = 'migrations'
                           );
            `)
      return rows[0].exists
    } catch (error) {
      throw new MigrationError(ERR_MIGRATION_DIRECTOR_CHECK_MIGRATIONS_TABLE, error)
    }
  }

  async #loadMigrationsFromDatabase() {
    try {
      const response = await this.client.query(`
                SELECT ${MIGRATIONS_TABLE_NAME_COLUMN}
                FROM ${MIGRATIONS_TABLE_NAME}`
      )

      this.migrationsFromDatabase = response.rows.reduce((acc, { migration_name }) => {
        acc.byKey[migration_name] = true
        acc.arr.push(migration_name)
        return acc
      }, { byKey: {}, arr: [] })
    } catch (error) {
      throw new MigrationError(ERR_MIGRATION_DIRECTOR_LOAD_MIGRATIONS_FROM_DATABASE, error)
    }
  }

  #loadMigrations(paths, { initialMigration }) {
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
}

export default MigrationManager