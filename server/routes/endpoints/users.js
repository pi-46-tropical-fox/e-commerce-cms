const userEndpoints = require('express').Router()
const { UserController } = require('../../controllers')

userEndpoints
.post('/register', UserController.register)

module.exports = userEndpoints