const router = require('express').Router()
const ProductController = require('../controllers/productController')
const { authentication , authorization , authorizationCustomer} = require('../middlewares/auth')

router.get('/', ProductController.show )
router.get('/:gender', ProductController.showByGender )
router.get('/category/:CategoryId', ProductController.showByCategory )
router.use(authentication)
router.post('/', authorization, ProductController.addProduct )
router.get('/editProduct/:id', authorization, ProductController.editProduct )
router.patch('/:id', authorizationCustomer, ProductController.updateStock )
router.put('/:id', authorization, ProductController.editPostProduct )
router.delete('/:id', authorization, ProductController.deleteProduct )

module.exports = router