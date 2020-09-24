const route = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { authentication, authorization } = require('../middlewares/auth')

route.post('/', authentication, authorization, ProductController.addProduct)
route.get('/', authentication, authorization, ProductController.getAllProduct)
route.get('/:id', authentication, authorization, ProductController.detailProduct)
route.put('/:id', authentication, authorization, ProductController.updateProduct)
route.delete('/:id', authentication, authorization, ProductController.deleteProduct)


module.exports = route