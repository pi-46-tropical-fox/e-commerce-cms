const ProductController = require("../controllers/ProductController");
const productRouter = require("express").Router();
const { authentication, authorization } = require("../middlewares/auth");

productRouter.post("/", authentication, authorization, ProductController.addProduct);

productRouter.get("/", authentication, authorization, ProductController.showAllProduct);

productRouter.get("/:id", authentication, authorization, ProductController.getProductById);

productRouter.put("/:id", authentication, authorization, ProductController.updateProduct);

productRouter.delete("/:id", authentication, authorization, ProductController.deleteProduct);

module.exports = productRouter;