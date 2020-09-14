const router = require('express').Router()
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/productController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/products', ProductController.getProducts)
router.post('/products', ProductController.postProducts)

module.exports = router