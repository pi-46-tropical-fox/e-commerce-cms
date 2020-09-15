const productRoutes = require('express').Router()
const ProductController = require('../controllers/productController')
const { authentication, authorizationRole } = require('../middlewares/auth')

productRoutes.post('/products', authentication, authorizationRole, ProductController.addProduct)
productRoutes.get('/products', ProductController.getProduct)
productRoutes.get('/products/:id', ProductController.getProductId)
productRoutes.put('/products/:id', authentication, authorizationRole, ProductController.updateProduct)
productRoutes.delete('/products/:id', authentication, authorizationRole, ProductController.deleteProduct)


module.exports = productRoutes