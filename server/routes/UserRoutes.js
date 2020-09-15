const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/login', UserController.loginAdmin)

module.exports = router