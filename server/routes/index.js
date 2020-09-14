const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/products', ProductController.showProducts)
router.post('/products', ProductController.addProduct)
router.get('/products/:productId', ProductController.getProductById)
router.put('/products/:productId', ProductController.updateProduct)
router.delete('/products/:productId', ProductController.deleteProduct)

module.exports = router