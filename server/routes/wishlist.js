const router = require('express').Router()
const WishlistController = require('../controllers/wishlistController')
const { authentication , authorizationCustomer } = require('../middlewares/auth')

router.use(authentication)
router.get('/', WishlistController.show )
router.post('/', authorizationCustomer, WishlistController.addWishlist )
router.delete('/:id', authorizationCustomer, WishlistController.deleteWishlist )

module.exports = router