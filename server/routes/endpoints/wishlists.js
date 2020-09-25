const wishlistEndpoints = require('express').Router()
const { authenticate, authorize } = require('../../middleware/auth')
const { WishlistController } = require('../../controllers')

wishlistEndpoints
    .get('/', authenticate, WishlistController.read)
    .post('/', authenticate, WishlistController.create)
    .delete('/:id', authenticate, WishlistController.delete)

module.exports = wishlistEndpoints