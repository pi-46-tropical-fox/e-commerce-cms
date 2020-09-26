const router = require("express").Router();
const users_routes = require("./users_routes");
const products_routes = require("./products_routes");

router.use("/users", users_routes);
router.use("/products", products_routes);

module.exports = router;
