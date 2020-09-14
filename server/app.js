require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
const routes = require('./routes')


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use(routes)


module.exports = app