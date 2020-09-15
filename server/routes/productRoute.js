const route = require('express').Router()
const ProductController = require('../controllers/productController')
const { authentication } = require('../middlewares/auth')

route.get('/', authentication, ProductController.productList)
route.post('/', ProductController.addProduct)
route.put('/:itemId', ProductController.updateProduct)
route.delete('/:itemId', ProductController.deleteProduct)

module.exports = route