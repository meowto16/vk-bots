import Configuration from '../utils/classes/Configuration.js'
import Environment from '../utils/classes/Environment.js'

export const connectionString = (() => {
  if (Configuration.postgresDatabaseUrl) return Configuration.postgresDatabaseUrl

  const user = Configuration.postgresUsername
  const pass = Configuration.postgresPassword
  const dbname = Configuration.postgresDb
  const dbport = Configuration.postgresDbPort
  const host = Configuration.postgresHost

  return `postgresql://${user}:${pass}@${host}:${dbport}/${dbname}`
})()

export const poolSettings = {
  connectionString,
  ...(Environment.isProduction() && {
    ssl: {
      rejectUnauthorized: false,
    }
  }),
}