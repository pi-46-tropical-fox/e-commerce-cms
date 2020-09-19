const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')
const { authentication , authorization } = require('../middlewares/auth')


router.use( authentication, authorization )
router.get('/', CategoryController.show )
router.post('/add', CategoryController.add )
router.delete('/delete/:id', CategoryController.delete)

module.exports = router