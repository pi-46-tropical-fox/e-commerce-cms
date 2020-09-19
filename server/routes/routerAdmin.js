const controllerAdmin = require('../controllers/controllerAdmin')
const routerAdmin = require('express').Router()

routerAdmin.post('/admin/login', controllerAdmin.login)

module.exports = routerAdmin