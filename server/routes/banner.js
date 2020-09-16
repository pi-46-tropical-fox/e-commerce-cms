const router = require('express').Router()
const BannerController = require('../controllers/bannerController')
const { authentication , authorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', BannerController.show )
router.post('/add', authorization, BannerController.add )
router.get('/edit/:id', authorization, BannerController.edit )
router.put('/edit/:id', authorization, BannerController.editPost )
router.delete('/delete/:id', authorization, BannerController.delete )

module.exports = router