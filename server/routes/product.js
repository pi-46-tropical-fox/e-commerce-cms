const route = require('express').Router()
const controller = require('../controllers/ProductController')
const { authentication, authorization } = require('../middlewares/auth')

route.post('/', authentication, authorization , controller.createProduct)
route.delete('/:id', authentication , authorization , controller.deleteProduct)
route.put('/:id', authentication , authorization , controller.editProduct)

module.exports = route