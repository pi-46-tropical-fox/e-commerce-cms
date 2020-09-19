const router = require('express').Router()
const userController = require('../controllers/userController')
const prodController = require('../controllers/productController')
const { authentication, authorization } = require('../middlewares/auth')
router.post('/login',userController.login)

router.get('/', authentication, prodController.show)
router.post('/products', authentication, authorization, prodController.add)
router.get('/products/:id',authentication, authorization, prodController.find)
router.put('/products/:id',authentication, authorization, prodController.edit)
router.delete('/products/:id',authentication, authorization, prodController.remove)
module.exports = router