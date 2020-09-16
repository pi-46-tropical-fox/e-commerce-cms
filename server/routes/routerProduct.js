const controllerProduct = require('../controllers/controllerProduct');
const routerProduct = require('express').Router();
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization')

routerProduct.get('/admin/products',controllerProduct.getProduct);
routerProduct.post('/admin/products',authentication,controllerProduct.addProduct);
routerProduct.delete('/admin/products/:id',authentication,authorization,controllerProduct.deleteProduct);
routerProduct.put('/admin/products/:id',authentication,authorization,controllerProduct.editProduct)

module.exports = routerProduct
