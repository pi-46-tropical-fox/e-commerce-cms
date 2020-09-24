const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const banner = require('./banner')
const category = require('./category')
const cart = require('./cart')
const history = require('./history')
const wishlist = require('./wishlist')

router.use('/', user )
router.use('/products', product )
router.use('/banners', banner )
router.use('/categories', category )
router.use('/carts', cart )
router.use('/histories', history )
router.use('/wishlists', wishlist )


module.exports = router