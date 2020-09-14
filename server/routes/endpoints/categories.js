const categoryEndpoints = require('express').Router()
const { CategoryController } = require('../../controllers')

categoryEndpoints
.get('/', CategoryController.read)
.get('/:id', CategoryController.readOne)
.post('/', CategoryController.create)
.put('/:id', CategoryController.update)
.delete('/:id', CategoryController.delete)

module.exports = categoryEndpoints