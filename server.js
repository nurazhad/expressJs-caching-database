const express = require('express')
const axios = require('axios')
const cors = require('cors')
const Redis = require('redis')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const port = 3000
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// KONEKSI KE REDIS
const redisClient = Redis.createClient({ legacyMode: true })
redisClient.connect()
const DEFAULT_EXPIRATION = 3600

// GET DATA FROM API
app.get("/photos", async (req, res) => {
    redisClient.get(`photos`, async (error, photos) => {
        if (error) console.error(error)
        if (photos != null) {
            console.log("CACHED")
            return res.json(JSON.parse(photos))
        } else {
            console.log("NOT CACHED")
            const { data } = await axios.get("https://jsonplaceholder.typicode.com/photos")
            redisClient.setEx(`photos`, DEFAULT_EXPIRATION, JSON.stringify(data))
            res.json(data)
        }
    })
})