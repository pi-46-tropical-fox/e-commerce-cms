const route = require('express').Router()
const UserController = require('../controllers/UserController')
const ProductRouter = require('./ProductRoutes')

route.use('/login', UserController.login)
route.use('/products', ProductRouter)

module.exports = route