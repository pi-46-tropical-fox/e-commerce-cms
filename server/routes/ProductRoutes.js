const route = require('express').Router()
const ProductController = require('../controllers/ProductController')

route.post('/', ProductController.addProduct)
// route.get('/', ProductController.getAllProduct)
// route.get('/:id', ProductController.detailProduct)
// route.put('/:id', ProductController.updateProduct)
// route.delete('/:id', ProductController.deleteProduct)


module.exports = route