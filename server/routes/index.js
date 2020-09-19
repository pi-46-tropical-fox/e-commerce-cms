const router = require('express').Router()
const userRouter = require('./userRouter')
const productsRouter = require('./productsRouter')
const { authorization, authentication } = require('../middlewares/auth')

const errorHandler = require('../middlewares/errorHandler')

router.use('/user', userRouter)

router.use(authentication)

router.use('/products', productsRouter)

router.use(errorHandler)

module.exports = router
