const route = require('express').Router()
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');
// const {authentication,authorization} = require('../middleware/auth');

route.get('/', (req,res) => {
    res.send('CMS E-Comerce')
})
route.post('/register',UserController.register)
route.post('/login',UserController.login)

// route.use(authentication)
route.get('/products',  ProductController.showAllProduct)
route.post('/products',  ProductController.createProduct)
route.get('/products/:id',  ProductController.showIdProduct)
route.put('/products/:id',  ProductController.updateProduct)
route.delete('/products/:id',  ProductController.deleteProduct)


module.exports = route