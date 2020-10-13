require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const router = require ("./routes/index.js")

app.use (express.urlencoded ({ extended : true}))
app.use (express.json ())

app.use (cors ())
app.use (router)

module.exports = app