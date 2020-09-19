const router = require ("express").Router ()
const UserController = require ("../controllers/UserController.js")
const ProductController = require ("../controllers/ProductController.js")

const {authentication} = require ("../middlewares/authentication")
const {authorization} = require ("../middlewares/authorization.js")

router.post ("/register", UserController.registerUsers)
router.post ("/login", UserController.loginUsers)

router.post ("/products", ProductController.addProducts)
router.get ("/products", ProductController.getProducts)
router.get ("/products/:id",  ProductController.getProductbyId)
router.put ("/products/:id",  ProductController.editProducts)
router.delete ("/products/:id",  ProductController.deleteProducts)

// router.post ("/products", authentication, ProductController.addProducts)
// router.get ("/products", authentication, ProductController.getProducts)
// router.put ("/products/:id", authentication, authorization, ProductController.editProducts)
// router.delete ("/products/:id", authentication, authorization, ProductController.deleteProducts)



module.exports = router