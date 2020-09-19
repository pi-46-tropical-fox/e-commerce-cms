const router = require('express').Router()
const productRouter = require('./product')
const categoryRouter = require('./category')
const UserController = require('../controllers/UserController')
const {authentication} = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('Welcome!')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.use('/products', productRouter)
router.use('/categories', categoryRouter)

module.exports = router