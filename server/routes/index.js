const routes = require('express').Router();
const UserRoutes = require('../routes/UserRoutes');

routes.use(UserRoutes);

module.exports = routes;
