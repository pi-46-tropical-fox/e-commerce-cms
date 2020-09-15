const router = require('express').Router()
const productRouter = require('./product')

const {authentication} = require('../middlewares/auth.js')
const UserController = require('../controllers/UserController')
// const ProductController = require('../controllers/productController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.use('/products', productRouter)


module.exports = router