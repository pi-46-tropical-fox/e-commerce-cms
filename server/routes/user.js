'use strict'

const router = require('express').Router()
const UserController = require('../controllers/UserController')

// router.post('/register', UserController.registerAdmin)
router.post('/login', UserController.loginAdmin)


module.exports = router