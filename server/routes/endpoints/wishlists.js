const wishlistEndpoints = require('express').Router()
const { authenticate, authorize } = require('../../middleware/auth')
const { WishlistController } = require('../../controllers')

wishlistEndpoints
    .get('/', WishlistController.read)
    .post('/', authenticate, authorize, WishlistController.create)
    .delete('/:id', authenticate, authorize, WishlistController.delete)

module.exports = wishlistEndpoints