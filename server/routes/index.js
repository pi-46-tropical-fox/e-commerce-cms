const route = require('express').Router()
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');
const {authentication,authorization} = require('../middleware/auth');

route.get('/', (req,res) => {
    res.send('CMS E-Comerce')
})
route.post('/register',UserController.register)
route.post('/login',UserController.login)

route.use(authentication)
route.get('/products',  authorization,ProductController.showAllProduct)
route.post('/products', authorization, ProductController.createProduct)
route.get('/products/:id', authorization, ProductController.showIdProduct)
route.put('/products/:id', authorization, ProductController.updateProduct)
route.delete('/products/:id', authorization, ProductController.deleteProduct)


module.exports = route