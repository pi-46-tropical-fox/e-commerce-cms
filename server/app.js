const express = require('express');
require('dotenv').config()
const app = express()
const errHandler = require('./middleware/errHandler');
const route = require('./routes');
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(route)

app.use(errHandler)
module.exports = app




