const routes = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const bannerRoutes = require('./banner')

routes.get('/', (req, res, next) => {
    res.send('Heellooooww')
})

routes.use('/', userRoutes)
routes.use('/', productRoutes)
routes.use('/', bannerRoutes)


module.exports = routes