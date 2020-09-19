require('dotenv').config()
const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errHandler = require('./middlewares/errHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(routes)
app.use(errHandler)



module.exports = app