const cartEndpoints = require('express').Router()
const { authenticate, authorize } = require('../../middleware/auth')
const { CartController } = require('../../controllers')

cartEndpoints
    .get('/', authenticate, CartController.read)
    .post('/', authenticate, CartController.create)
    .put('/:id', authenticate, CartController.update)
    .delete('/:id', authenticate, CartController.delete)

module.exports = cartEndpoints