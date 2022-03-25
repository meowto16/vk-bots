import express from 'express'
import Environment from "./core/utils/classes/Environment.js";
import Configuration from "./core/utils/classes/Configuration.js";

const app = express()

app.listen(Configuration.port, () => {
    console.log(`Server running is running on...`)
    console.log(Environment.getVariable({
        [Environment.DEVELOP_ENVIRONMENT]: `http://localhost:${Configuration.port}`,
        [Environment.PRODUCTION_ENVIRONMENT]: `https://vk-bots.herokuapp.com`
    }))
})

app.get('/', (req, res) => {
    res.json({
        hello: 'world',
    })
})