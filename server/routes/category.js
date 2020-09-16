const CategoryController = require('../controllers/CategoryController')

const router = require('express').Router()

router.get('/', CategoryController.showAllCategory)
// router.get('/:id', CategoryController.showCategoryById)

module.exports = router