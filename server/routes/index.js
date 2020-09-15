const router = require('express').Router()
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const { authentication, authorization } = require('../middlewares/auth');


router.post('/login', UserController.login)


router.get('/products', authentication, authorization, ProductController.getProduct);
router.post('/products', authentication, authorization, ProductController.createProduct);

// router.get('/products/:id', ProductController.getProductById);
router.put('/products/:id', authentication, authorization, ProductController.updateProduct);

router.delete('/products/:id', authentication, authorization, ProductController.deleteProduct);

module.exports = router