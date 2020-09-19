const route = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')

route.get('/', (req, res) => {
    res.send('hai gais')
})
route.use('/users', userRoute)
route.use('/products', productRoute)

module.exports = route