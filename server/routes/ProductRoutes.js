const { authentication, authorizationByRoleAdmin } = require('../middlewares/auth');
const ProductController = require('../controllers/ProductController');

const routes = require('express').Router();

routes.get('/products', ProductController.list);
routes.get('/products/:id', ProductController.byId);

routes.post('/products', authentication, authorizationByRoleAdmin, ProductController.create);
routes.put('/products/:id', authentication, authorizationByRoleAdmin, ProductController.update);
routes.delete('/products/:id', authentication, authorizationByRoleAdmin, ProductController.delete);

module.exports = routes;
