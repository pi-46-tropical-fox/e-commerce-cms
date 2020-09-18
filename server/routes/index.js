const router = require('express').Router()
const userRouter = require('./userRouter')
const productsRouter = require('./productsRouter')
const { authorization, authentication } = require('../middlewares/auth')

router.use('/user', userRouter)
router.use(authentication)
router.use('/products', productsRouter)


module.exports = router
