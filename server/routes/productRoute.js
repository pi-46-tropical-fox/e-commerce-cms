const route = require('express').Router()
const ProductController = require('../controllers/productController')
const { authentication, authorization } = require('../middlewares/auth')

route.get('/', authentication, ProductController.productList)
route.post('/', authentication, authorization, ProductController.addProduct)
route.get('/:productId', authentication, authorization, ProductController.getOneProduct)
route.put('/:productId', authentication, authorization, ProductController.updateProduct)
route.delete('/:productId', authentication, authorization, ProductController.deleteProduct)

module.exports = route