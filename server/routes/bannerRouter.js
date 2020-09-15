const bannerRouter = require("express").Router();
const { authentication, authorization } = require("../middlewares/auth");
const BannerController = require("../controllers/BannerController");

bannerRouter.post("/", authentication, authorization, BannerController.addBanner);

bannerRouter.get("/", authentication, authorization, BannerController.showAllBanner);

bannerRouter.get("/:id", authentication, authorization, BannerController.getBannerById);

bannerRouter.put("/:id", authentication, authorization, BannerController.updateBanner);

bannerRouter.delete("/:id", authentication, authorization, BannerController.deleteBanner);

module.exports = bannerRouter;