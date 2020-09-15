const route = require('express').Router()
const controller = require('../controllers/UserController')

route.post('/login', controller.login)

module.exports = route