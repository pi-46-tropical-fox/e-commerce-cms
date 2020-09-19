'use strict'

const router = require('express').Router()
const BannerController = require('../controllers/BannerController')
const { authentication } = require('../middlewares/authentication')
const { authorizationBanner } = require('../middlewares/authorizationBanner')

router.use(authentication)
router.get('/', BannerController.getBanner)

router.post('/', authorizationBanner, BannerController.createBanner)
router.get('/:banner_id', authorizationBanner, BannerController.showOneBanner)
router.delete('/:banner_id', authorizationBanner, BannerController.deleteBanner)
router.put('/:banner_id', authorizationBanner, BannerController.updateBanner)


module.exports = router