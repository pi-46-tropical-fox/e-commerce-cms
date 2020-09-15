const routes = require('express').Router();
const UserRoutes = require('../routes/UserRoutes');
const ProductRoutes = require('../routes/ProductRoutes');

routes.use(UserRoutes);
routes.use(ProductRoutes);

module.exports = routes;
