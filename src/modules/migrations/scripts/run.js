import MigrationManager from "../classes/MigrationManager.js";
import Logger from "../../../core/utils/classes/Logger.js";

const manager = new MigrationManager()

await manager.connect()
    .then(() => Logger.success(`Migration runner: Connection successfully settled`))
    .catch((error) => Logger.error(`Migration runner: Failed to set connection`, error))

await manager.init()
    .then(() => Logger.success(`Migration runner: Successfully initialized`))
    .catch((err) => {
        Logger.error(`Migration runner: Failed to initialize`, err)
        process.exit(err.code)
    })

await manager.runMigrations({
    onMigrationSuccess: (migration) => Logger.success(`Migration ${migration.migrationName} successfully applied`),
    onMigrationFailed: (migration, error) => Logger.error(`Migration ${migration.migrationName} failed`, error),
    onMigrationExist: (migration) => Logger.info(`Migration ${migration.migrationName} already applied. Skipping...`)
})
    .then(() => Logger.success('Migration runner: All migrations successfully applied'))
    .catch((error) => Logger.error('Migration runner: Error while trying to run migrations', error))

await manager.close()
    .then(() => Logger.success(`Migration runner: Connection successfully closed`))
    .catch((error) => Logger.error(`Migration runner: Connection close error`, error))