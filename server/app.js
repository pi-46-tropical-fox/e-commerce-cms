const express = require('express')
if(process.env.NODE_ENV !== 'production') require('dotenv').config()
const routes = require('./routes')
const errHandler = require('./middleware/errHandler')
const app = express()
const cors = require('cors')

app
.use(express.json())
.use(express.urlencoded({ extended: true }))
.use(cors())
.use(routes)
.use(errHandler)

module.exports = app
