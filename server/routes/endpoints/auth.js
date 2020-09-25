const authEndpoints = require('express').Router()
const { AuthController } = require('../../controllers')

authEndpoints
.post('/login', AuthController.login)
.post('/login/g', AuthController.socialLogin)

module.exports = authEndpoints