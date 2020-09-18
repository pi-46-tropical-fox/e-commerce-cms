const categoryEndpoints = require('express').Router()
const { authenticate, authorize } = require('../../middleware/auth')
const { CategoryController } = require('../../controllers')

categoryEndpoints
.get('/', CategoryController.read)
.get('/:id', CategoryController.readOne)
.post('/', authenticate, authorize, CategoryController.create)
.put('/:id', authenticate, authorize, CategoryController.update)
.delete('/:id', authenticate, authorize, CategoryController.delete)

module.exports = categoryEndpoints