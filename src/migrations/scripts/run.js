import path from 'path'
import fs from 'fs'



import { MIGRATIONS_DIR} from "../constants/base.js";
import MigrationDirector from "../classes/MigrationDirector.js";

const migrationDirector = new MigrationDirector()

await migrationDirector.connect()
const migrations = migrationDirector.getMigrationsList()

const migrations = migrations.filter(async () => {

})


await migrationDirector.close()