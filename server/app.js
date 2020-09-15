require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const route = require('./routes')
const {errHandler} = require('./middlewares/errHandler')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(route)

app.use(errHandler)

module.exports = app