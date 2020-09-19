'use strict'

const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { authentication } = require('../middlewares/authentication')
const { authorizationProduct } = require('../middlewares/authorization')

router.use(authentication)
router.get('/', ProductController.getProduct)

router.post('/', authorizationProduct, ProductController.createProduct)
router.get('/:product_id', authorizationProduct, ProductController.showOneProduct)
router.delete('/:product_id', authorizationProduct, ProductController.deleteProduct)
router.put('/:product_id', authorizationProduct, ProductController.updateProduct)


module.exports = router