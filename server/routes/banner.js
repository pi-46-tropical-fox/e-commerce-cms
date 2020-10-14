const router = require('express').Router()
const BannerController = require('../controllers/bannerController')
const { authentication , authorization } = require('../middlewares/auth')

router.get('/', BannerController.show )
router.use(authentication)
router.post('/', authorization, BannerController.addBanner )
router.get('/:id', authorization, BannerController.editBanner )
router.put('/:id', authorization, BannerController.editPostBanner )
router.delete('/:id', authorization, BannerController.deleteBanner )

module.exports = router