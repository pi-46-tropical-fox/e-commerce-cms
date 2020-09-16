const router = require('express').Router()
const ProductController = require('../controllers/productController')
const { authentication , authorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', ProductController.show )
router.post('/add', authorization, ProductController.add )
router.get('/edit/:id', authorization, ProductController.edit )
router.put('/edit/:id', authorization, ProductController.editPost )
router.delete('/delete/:id', authorization, ProductController.delete )

module.exports = router