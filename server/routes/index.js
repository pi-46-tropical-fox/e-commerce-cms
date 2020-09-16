const routes = require('express').Router();
const UserRoutes = require('../routes/UserRoutes');
const ProductRoutes = require('../routes/ProductRoutes');
const CategoryRoutes = require('../routes/CategoryRoutes');

routes.use(UserRoutes);
routes.use(ProductRoutes);
routes.use(CategoryRoutes);

module.exports = routes;
