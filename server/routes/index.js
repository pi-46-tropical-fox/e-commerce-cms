const route = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')

route.use('/users', userRoute)
route.use('/products', productRoute)

module.exports = route