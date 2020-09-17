const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const { authentication } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

// router.use(authentication)
router.get('/products', ProductController.showProducts)
router.post('/products', ProductController.addProduct)
router.get('/products/:productId', ProductController.getProductById)
router.put('/products/:productId', ProductController.updateProduct)
router.delete('/products/:productId', ProductController.deleteProduct)

module.exports = router