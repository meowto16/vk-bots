class Configuration {
  /**
     * Application NODE_ENV
     * @return {'production'|'development'}
     */
  static get nodeEnv() {
    return process.env.NODE_ENV || 'development'
  }

  /**
     * Express listen port
     * @return {number}
     */
  static get port() {
    const port = process.env.PORT
    return port ? Number(port) : 3000
  }

  /**
     * Postgres database password
     * @return {string}
     */
  static get postgresPassword() {
    return process.env.PGPASSWORD
  }

  /**
     * Postgres database name
     * @return {string}
     */
  static get postgresDb() {
    return process.env.PGDATABASE
  }

  static get postgresHost() {
    return process.env.PGHOST
  }

  /**
   * Postgres database name
   * @return {string}
   */
  static get postgresDbPort() {
    return process.env.PGPORT
  }

  /**
     * Postgres username
     * @return {string}
     */
  static get postgresUsername() {
    return process.env.PGUSER
  }

  static get postgresDatabaseUrl() {
    return process.env.DATABASE_URL
  }
}

export default Configuration