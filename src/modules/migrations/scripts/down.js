import MigrationManager from "../classes/MigrationManager.js";
import Logger from "../../../core/utils/classes/Logger.js";

const manager = new MigrationManager()

await manager.connect()
    .then(() => Logger.success(`Migration runner: Connection successfully settled`))
    .catch((error) => Logger.error(`Migration runner: Failed to set connection`, error))

await manager.init({ skipInitialMigration: true })
    .then(() => Logger.success(`Migration runner: Successfully initialized`))
    .catch((err) => {
        Logger.error(`Migration runner: Failed to initialize`, err)
        process.exit(err.code)
    })

await manager.downLastMigration()
    .then((migration) => {
        migration
            ? Logger.success(`Migration runner: Successfully down migration "${migration.migrationName}"`)
            : Logger.info(`Migration runner: No migrations to down. Skipping...`)
    })
    .catch((error) => {
        return Logger.error(`Migration runner: Error while trying to down migration`, error)
    })

await manager.close()
    .then(() => Logger.success(`Migration runner: Connection successfully closed`))
    .catch((error) => Logger.error(`Migration runner: Connection close error`, error))