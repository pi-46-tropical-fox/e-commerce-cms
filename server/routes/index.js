const router = require(`express`).Router()
const productRoutes = require(`./product`)
const bannerRoutes = require(`./banner`)
const {authentication, authorization} = require(`../middlewares/auth`)
const UserController = require(`../controllers/UserController`)


router.get('/', (req, res)=>{
    res.send('Terhubung kedalam Server E-Commerce')
})
router.post(`/login`, UserController.login)
router.use(authentication)
router.use(authorization)
router.use(`/products`, productRoutes)
router.use(`/banners`, bannerRoutes)

module.exports = router
