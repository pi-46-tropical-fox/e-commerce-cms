const routes = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')

routes.get('/', (req, res, next) => {
    res.send('Heellooooww')
})

routes.use('/', userRoutes)
routes.use('/', productRoutes)


module.exports = routes