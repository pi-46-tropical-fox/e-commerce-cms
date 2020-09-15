const ProductController = require('../controllers/ProductController')
const {authorization} = require('../middlewares/auth')

const router = require('express').Router()

router.get('/', ProductController.showAllProduct)
router.post('/', authorization, ProductController.createNewProduct)
router.put('/:productId', authorization, ProductController.updateProduct)
router.delete('/:productId', authorization, ProductController.deleteProduct)

module.exports = router