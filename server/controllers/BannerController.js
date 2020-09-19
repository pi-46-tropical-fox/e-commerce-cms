const { Banner } = require("../models");

class BannerController {

  static async addBanner (req, res, next) {
    try {
      const { title, status, image_url } = req.body;
      const banner = await Banner.create({
        title,
        status,
        image_url
      });
      return res.status(201).json(banner);
    } catch (err) {
      console.log(err, "<<<< error in addBanner BannerController");
      return next(err);
    }
  }

  static async showAllBanner (req, res, next) {
    try {
      const banners = await Banner.findAll();
      return res.status(200).json(banners);
    } catch (err) {
      console.log(err, "<<<< error in showAllBanner BannerController");
      return next(err);
    }
  }
  static async getBannerById (req, res, next) {
    try {
      const banner = await Banner.findByPk(+req.params.id);
      return res.status(200).json(banner);
    } catch (err) {
      console.log(err, "<<<< error in getBannerById BannerController");
      return next(err);
    }
  }

  static async updateBanner (req, res, next) {
    try {
      const { title, status, image_url } = req.body;
      const banner = await Banner.update({
        title,
        status,
        image_url
      }, {
        where: {
          id: +req.params.id
        },
        returning: true
      });
      return res.status(200).json(banner[1][0]);
    } catch (err) {
      console.log(err, "<<<< error in updateBanner BannerController");
      return next(err);
    }
  }

  static async deleteBanner (req, res, next) {
    try {
      const banner = await Banner.destroy({
        where: {
          id: +req.params.id
        }
      });
      return res.status(200).json({ message: "Banner has been deleted successfully" });
    } catch (err) {
      console.log(err, "<<<< error in deleteBanner BannerController");
      return next(err);
    }
  }

}

module.exports = BannerController;