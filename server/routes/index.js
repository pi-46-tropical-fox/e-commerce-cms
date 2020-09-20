const router = require("express").Router()
const UserController = require('../controller/UserController')
const ProductController = require("../controller/ProductController")
const { authentication } = require("../middleware/auth")

router.get("/", (req, res) => {
    res.json({messsage: "MASUK HEROKU"})
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.get('/product', ProductController.read)
router.get('/product/:id', ProductController.getOne)
router.post('/product', ProductController.create)
router.patch('/product/:id', ProductController.update)
router.delete('/product/:id', ProductController.delete)



module.exports = router