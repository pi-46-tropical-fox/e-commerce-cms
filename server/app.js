require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const routes = require('./routes')

// body parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// cors
app.use(cors())

// routes
app.use(routes)

app.listen(port, () => console.log(`listening on port: ${port}`))

module.exports = app