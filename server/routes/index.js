const router = require ("express").Router ()
const UserController = require ("../controllers/UserController.js")
const ProductController = require ("../controllers/ProductController.js")

// const {authentication} = require ("../middlewares/authentication")
// const {authorization} = require ("../middlewares/authorization.js")

router.post ("/register", UserController.registerUsers)
router.post ("/login", UserController.loginUsers)

router.post ("/products", ProductController.addProducts)
// router.post ("/products", authentication, authorization, ProductController.addProducts)
// router.get ("/products", ProductController.getProducts)
// router.put ("/products/:id", ProductController.editProducts)
// router.delete ("/products/:id", ProductController.deleteProducts)



module.exports = router