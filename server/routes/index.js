const router = require('express').Router()
const { request } = require('express')
const userController = require('../controllers/userController')
const Controller = require('../controllers/controller')
const { authentication, authorization } = require('../middleware/auth')


router.post('/login',userController.login)

router.get('/products',authentication,authorization,Controller.list)
router.post('/products',authentication,authorization,Controller.add)
router.get('/products/:id',authentication,authorization,Controller.getOne)
router.put('/products/:id',authentication,authorization,Controller.edit)
router.delete('/products/:id',authentication,authorization,Controller.delete)

module.exports = router