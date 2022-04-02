import fs from 'fs'
import path from 'path'

import { MIGRATIONS_DIR } from "../constants/base.js";
import Logger from "../../../core/utils/classes/Logger.js";

const migrationName = process.argv[2]

if (!migrationName) {
    Logger.error('No migration name provided')
    process.exit(1)
}

const camelize = string => string[0].toUpperCase() + string.slice(1)

const createMigrationTemplate = (migrationName) => {
    const className = [
        ...(migrationName.split('-').slice(1)),
        'Migration'
    ]
    .map(camelize)
    .join('')

    return `import Migration from '../classes/Migration.js'

class ${className} extends Migration {
    async up(client) {
        
    }

    async down(client) {
        
    }
}

export default ${className}
`
}

const filename = path.resolve(MIGRATIONS_DIR, `${migrationName}.migration.js`)
const content = createMigrationTemplate(migrationName)

try {
    fs.writeFileSync(filename, content)
    Logger.success(`Successfully created migration ${migrationName}`)
} catch (error) {
    Logger.error('Error while trying to create migration', error)
}