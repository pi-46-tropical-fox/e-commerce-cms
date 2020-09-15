const route = require('express').Router()
const UserController = require('../controllers/userController')

route.post('/login', UserController.login)

module.exports = route