const route = require('express').Router()
const {UserController} = require('../controllers/user')
const {ProductController, CategoryController} = require('../controllers/product')
const { authenticate, authorize } = require('../middlewares/auth')

route.post('/register', UserController.register)
route.post('/login', UserController.login)

route.use(authenticate)
route.use('/products', authorize)

route.get('/categories', CategoryController.getCategories)
route.get('/categories/:categoryId', CategoryController.getProductsByCategory)

route.post('/products', ProductController.newItem)
route.get('/products', ProductController.getItems)
route.put('/products/:id', ProductController.restockItem)
route.patch('/products/:id', ProductController.editItem)
route.delete('/products/:id', ProductController.deleteItem)

module.exports = route