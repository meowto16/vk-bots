import pg from 'pg'

import RepositoryError from "./RepositoryError.js";

import {ERR_REPOSITORY_CLOSE, ERR_REPOSITORY_CONNECT} from "../constants/repositoryError.js";

class Repository {
    constructor() {
        this.pool = null
        this.client = null
    }

    async connect() {
        try {
            this.pool = new pg.Pool({})
            this.client = await this.pool.connect()

            return this
        } catch (error) {
            throw new RepositoryError(ERR_REPOSITORY_CONNECT, error)
        }
    }

    async close() {
        try {
            await this.client.release()
            return this.pool.end()
        } catch (error) {
            throw new RepositoryError(ERR_REPOSITORY_CLOSE, error)
        }
    }
}

export default Repository