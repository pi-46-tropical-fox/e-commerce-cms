const router = require("express").Router();
const Controller = require("../controllers/UserController");

router.post("/login", Controller.login);

module.exports = router;
