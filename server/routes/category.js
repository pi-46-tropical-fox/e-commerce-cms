const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')
const { authentication , authorization } = require('../middlewares/auth')


router.get('/', CategoryController.show )
router.use( authentication, authorization )
router.post('/', CategoryController.addCategory )
router.delete('/:id', CategoryController.deleteCategory)

module.exports = router