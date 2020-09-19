const route = require('express').Router()
const productRoute = require('../routes/product')
const userRoute = require('./user')

route.get('/', (req, res) => {
    res.send('The Server Is Working')
})

route.use('/product', productRoute)
route.use('/auth', userRoute)

module.exports = route