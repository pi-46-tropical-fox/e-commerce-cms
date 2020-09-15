const { urlencoded } = require('express')
const express = require('express')
const app = express()
const router = require('./routes/index')
// const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

module.exports = app