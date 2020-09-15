const router = require('express').Router()
const productRouter = require('./product')
const UserController = require('../controllers/UserController')
const {authentication} = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.use('/products', productRouter)

// router.get('/', (req, res) => {
//     res.send('home')
// })

module.exports = router