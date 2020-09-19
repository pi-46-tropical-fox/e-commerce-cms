
const router = require("express").Router()
const users = require("./users")
const product = require("./products")
const categories = require('./categories')
const {authentication, adminAuthorization} = require("../middlewares/userAuth")

router.get("/", function(req, res){
    res.send("E-Commerce API")
})

router.use("/users", users)

router.use(authentication)

router.use(adminAuthorization)
router.use('/categories', categories)
router.use("/products", product)



module.exports= router