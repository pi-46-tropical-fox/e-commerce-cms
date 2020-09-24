const router = require('express').Router()
const HistoryController = require('../controllers/historyController')
const { authentication , authorizationCustomer } = require('../middlewares/auth')

router.use(authentication, authorizationCustomer)
router.get('/', HistoryController.show )
router.post('/', HistoryController.addHistory )

module.exports = router