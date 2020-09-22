const CategoryController = require('../controllers/CategoryController');

const routes = require('express').Router();

routes.get('/categories', CategoryController.list);

routes.get('/categories/:id', CategoryController.byId);

module.exports = routes;
