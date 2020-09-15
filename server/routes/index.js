const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentification')
const UserController = require('../controllers/UserController')

router.post('/login', UserController.login)

router.get('/products', authentication, authorization, ProductController.getProduct)
router.post('/products', authentication, authorization, ProductController.addProduct)
router.get('/products/:id', authentication, ProductController.findProduct)
router.put('/products/:id', authentication, authorization, ProductController.updateProduct)
router.delete('/products/:id', authentication, authorization, ProductController.deleteProduct)

module.exports = router 