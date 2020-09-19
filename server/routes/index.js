const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const banner = require('./banner')
const category = require('./category')

router.use('/', user )
router.use('/products', product )
router.use('/banners', banner )
router.use('/categories', category )


module.exports = router