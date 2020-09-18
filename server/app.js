const express = require('express');
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




