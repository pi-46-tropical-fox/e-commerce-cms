const UserController = require("../controllers/UserController");
const userRouter = require("express").Router();


userRouter.get("/", UserController.showHome);

userRouter.post("/register", UserController.register);

userRouter.post("/login", UserController.login);

module.exports = userRouter;