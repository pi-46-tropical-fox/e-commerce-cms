const router = require('express').Router()
const ProductController = require('../controllers/productController')

const {authorization} = require('../middlewares/auth.js')

router.get('/', ProductController.getProducts)
router.post('/', ProductController.postProduct)

router.put('/:id', authorization, ProductController.editProduct)
router.delete('/:id', authorization, ProductController.deleteProduct)

module.exports = router