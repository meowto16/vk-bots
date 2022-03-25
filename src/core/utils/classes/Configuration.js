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
        return process.env.POSTGRES_PASSWORD
    }

    /**
     * Postgres database name
     * @return {string}
     */
    static get postgresDb() {
        return process.env.POSTGRES_DB
    }

    /**
     * Postgres username
     * @return {string}
     */
    static get postgresUsername() {
        return process.env.POSTGRES_USERNAME
    }
}

export default Configuration