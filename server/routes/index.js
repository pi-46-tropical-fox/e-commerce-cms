const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const { authentication, authorization } = require('../middlewares/auth')

app.get('/', (req, res) => {
    res.send('Hello World!')
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.get('/products', authorization,ProductController.showProducts)
router.post('/products', authorization,ProductController.addProduct)
router.get('/products/:productId', authorization, ProductController.getProductById)
router.put('/products/:productId', authorization, ProductController.updateProduct)
router.delete('/products/:productId', authorization, ProductController.deleteProduct)

module.exports = router