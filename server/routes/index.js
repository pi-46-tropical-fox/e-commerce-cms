const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const { authentication, authorization } = require('../middlewares/auth')
const route = require('express').Router()

route.post('/login', UserController.login)

route.use(authentication)
route.post('/product', authorization, ProductController.add)
route.get('/product', ProductController.show)
route.get('/product/:id', ProductController.showById)
route.put('/product/:id', authorization, ProductController.update)
route.delete('/product/:id', authorization, ProductController.delete)

module.exports = route