const route = require('express').Router()
const UserRouter = require('./UserRoutes')
const ProductRouter = require('./ProductRoutes')

route.use('/users', UserRouter)
route.use('/product', ProductRouter)

module.exports = route