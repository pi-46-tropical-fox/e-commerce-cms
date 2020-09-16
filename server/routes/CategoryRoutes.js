const { authentication } = require('../middlewares/auth');
const CategoryController = require('../controllers/CategoryController');

const routes = require('express').Router();

routes.get('/categories', authentication, CategoryController.list);

routes.get('/categories/:id', authentication, CategoryController.byId);

module.exports = routes;
