const cartEndpoints = require('express').Router()
const { authenticate, authorize } = require('../../middleware/auth')
const { CartController } = require('../../controllers')

cartEndpoints
    .get('/', CartController.read)
    .post('/', authenticate, authorize, CartController.create)
    .put('/:id', authenticate, authorize, CartController.update)
    .delete('/:id', authenticate, authorize, CartController.delete)

module.exports = cartEndpoints