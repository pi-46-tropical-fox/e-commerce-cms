const router = require('express').Router()
const CartController = require('../controllers/cartController')
const { authentication , authorizationCustomer } = require('../middlewares/auth')

router.use(authentication)
router.get('/', CartController.show )
router.post('/', authorizationCustomer, CartController.addCart )
router.get('/:id', authorizationCustomer, CartController.editCart )
router.get('/product/:id', authorizationCustomer, CartController.findByProduct )
router.put('/:id', authorizationCustomer, CartController.editPostCart )
router.delete('/:id', authorizationCustomer, CartController.deleteCart )

module.exports = router