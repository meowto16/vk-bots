import { URL } from 'url'
import path from 'path'
import fs from 'fs'

export const __filename = new URL('', import.meta.url).pathname
export const __dirname = new URL('.', import.meta.url).pathname

export const MIGRATIONS_DIR = path.resolve(__dirname, '..', 'migrations')
export const MIGRATIONS_TABLE_NAME = 'migrations'
export const MIGRATIONS_TABLE_NAME_COLUMN = 'migration_name'
export const INITIAL_MIGRATION_NAME = '0-create-migrations-table'

export const migrations = fs.readdirSync(MIGRATIONS_DIR).filter(file => file.endsWith('.migration.js'))

