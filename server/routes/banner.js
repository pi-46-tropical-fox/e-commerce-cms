const bannerRoutes = require('express').Router()
const BannerController = require('../controllers/bannerController')
const { authentication, authorizationRole } = require('../middlewares/auth')

bannerRoutes.post('/banners', authentication, authorizationRole, BannerController.addBanner)
bannerRoutes.get('/banners', authentication, authorizationRole, BannerController.getBanner)
bannerRoutes.get('/banners/:id', authentication, authorizationRole, BannerController.getBannerId)
bannerRoutes.put('/banners/:id', authentication, authorizationRole, BannerController.updateBanner)
bannerRoutes.delete('/banners/:id', authentication, authorizationRole, BannerController.deleteBanner)


module.exports = bannerRoutes