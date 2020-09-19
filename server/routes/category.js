const CategoryController = require('../controllers/CategoryController')

const router = require('express').Router()

router.get('/', CategoryController.showAllCategory)

module.exports = router