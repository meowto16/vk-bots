import { URL } from "url";
import path from "path";
import fs from "fs";

export const __filename = new URL('', import.meta.url).pathname
export const __dirname = new URL('.', import.meta.url).pathname

export const MIGRATIONS_DIR = path.resolve(__dirname, '..')
export const MIGRATIONS_TABLE_NAME = 'migrations'
export const MIGRATIONS_TABLE_NAME_COLUMN = 'migration_name'

export const migrations = fs.readdirSync(MIGRATIONS_DIR).filter(file => file.endsWith('.migration.js'))
