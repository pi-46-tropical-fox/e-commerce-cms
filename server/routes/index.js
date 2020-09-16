const router = require('express').Router();
const routerAdmin = require('./routerAdmin');
const routerProduct = require('./routerProduct');
const errorHandler = require('../middlewares/errorHandler');

router.use(routerAdmin);
router.use(routerProduct);

router.use(errorHandler);

module.exports = router;