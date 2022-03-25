import 'dotenv/config'
import express from 'express'
import {QueryTypes, Sequelize} from "sequelize"

import Environment from "./core/utils/classes/Environment.js"
import Configuration from "./core/utils/classes/Configuration.js"

const app = express()

app.listen(Configuration.port, () => {
    console.log(`Server running is running on...`)
    console.log(Environment.getVariable({
        [Environment.DEVELOP_ENVIRONMENT]: `http://localhost:${Configuration.port}`,
        [Environment.PRODUCTION_ENVIRONMENT]: `https://vk-bots.herokuapp.com`
    }))
})

app.get('/', async (req, res) => {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        database: Configuration.postgresDb,
        password: Configuration.postgresPassword,
        username: Configuration.postgresUsername
    })

    const response = await sequelize.query('SELECT * FROM users', { type: QueryTypes.SELECT })

    res.json({
        hello: 'world',
        response
    })
})