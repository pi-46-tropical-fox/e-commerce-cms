const route = require('express').Router()
const productRoute = require('../routes/product')
const userRoute = require('./user')

// route.get('/', (req, res) => {
//     res.send('wadiwaw')
// })

route.use('/product', productRoute)
route.use('/auth', userRoute)

module.exports = route