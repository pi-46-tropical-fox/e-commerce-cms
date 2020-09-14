const productEndpoints = require('express').Router()
const { ProductController } = require('../../controllers')

productEndpoints
.get('/', ProductController.read)
.get('/:id', ProductController.readOne)
.post('/', ProductController.create)
.put('/:id', ProductController.update)
.delete('/:id', ProductController.delete)

module.exports = productEndpoints