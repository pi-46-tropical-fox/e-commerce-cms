const router = require("express").Router()
const UserController = require('../controller/UserController')
const ProductController = require("../controller/ProductController")
const { authentication } = require("../middleware/auth")


router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.post('/product', ProductController.create)
router.patch('/product/:id', ProductController.update)
router.delete('/product/:id', ProductController.delete)



module.exports = router