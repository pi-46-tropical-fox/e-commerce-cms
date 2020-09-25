const productEndpoints = require('express').Router()
const { authenticate, authorize } = require('../../middleware/auth')
const { ProductController } = require('../../controllers')

productEndpoints
.get('/', ProductController.read)
.get('/:id', ProductController.readOne)
.post('/', authenticate, authorize, ProductController.create)
.put('/:id', authenticate, authorize, ProductController.update)
.delete('/:id', authenticate, authorize, ProductController.delete)

module.exports = productEndpoints