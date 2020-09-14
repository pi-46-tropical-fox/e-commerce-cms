require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.POST || 3001
const route = require('./routes')


app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use(route)

module.exports = app