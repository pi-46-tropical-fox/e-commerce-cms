const productRoutes = require('express').Router()
const ProductController = require('../controllers/productController')
const { authentication, authorizationRole } = require('../middlewares/auth')

productRoutes.post('/products', authentication, authorizationRole, ProductController.addProduct)
productRoutes.get('/products', authentication, authorizationRole, ProductController.getProduct)
productRoutes.get('/products/:id', authentication, authorizationRole, ProductController.getProductId)
productRoutes.put('/products/:id', authentication, authorizationRole, ProductController.updateProduct)
productRoutes.delete('/products/:id', authentication, authorizationRole, ProductController.deleteProduct)


module.exports = productRoutes