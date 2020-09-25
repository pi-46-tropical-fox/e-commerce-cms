const CategoryController = require('../controllers/categoryController')

const router = require('express').Router()

router.get('/', CategoryController.getCategories)
router.post('/', CategoryController.createCategory)
router.delete('/:id', CategoryController.deleteCategory)


module.exports = router