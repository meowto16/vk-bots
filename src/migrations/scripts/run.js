import { migrations } from "../constants/base.js";
import MigrationDirector from "../classes/MigrationDirector.js";
import Logger from "../../core/utils/classes/Logger.js";

const manager = new MigrationDirector()

await manager.connect()
    .then(() => Logger.success(`Migration runner: Connection successfully settled`))
    .catch((error) => Logger.error(`Migration runner: Failed to set connection`, error))

await manager.init()
    .then(() => Logger.success(`Migration runner: successfully initialized`))
    .catch((err) => {
        Logger.error(`Migration runner: failed to initialize`, err)
        process.exit(err.code)
    })

manager.loadMigrations(migrations, {
    initialMigration: '0-create-migrations-table'
})

await manager.runMigrations({
    onMigrationSuccess: (migration) => {
        Logger.success(`Migration ${migration.migrationName} successfully applied`)
    },
    onMigrationFailed: (migration) => {
        Logger.error(`Migration ${migration.migrationName} failed`)
    },
    onMigrationExist: (migration) => {
        Logger.info(`Migration ${migration.migrationName} already applied`)
    },
    onMigrationsNotFound: () => {
        Logger.error(`Not found migrations in migrations folder`)
    },
})

await manager.close({
    onCloseSuccess: () => Logger.success(`Migration runner: Connection successfully closed`),
    onCloseError: (error) => Logger.error(`Migration runner: Connection close error`, error)
})
