const router = require('express').Router()
const ProductController = require('../controller/ProductController')
const { authorization } = require('../middlewares/auth')

router.get('/', ProductController.getProducts)

router.use(authorization)

router.post('/', ProductController.createProduct)
router.delete('/:id', ProductController.deleteProduct)
router.put('/:id', ProductController.editProduct)


module.exports = router
