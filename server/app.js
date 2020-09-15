const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errHandler')


//BODY PARSER
app.use(express.urlencoded({extended: true}))
app.use(express.json())


//ROUTER
app.use(routes)


//Error Handler Middleware
app.use(errorHandler)



module.exports = app
