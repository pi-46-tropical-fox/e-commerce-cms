const { Product } = require("../models");

class ProductController {

  static async addProduct(req, res, next) {
    try {
      const { name, image_url, price, stock, category } = req.body;
      const product = await Product.create({
        name,
        image_url,
        price,
        stock,
        category
      });
      return res.status(201).json(product);
    } catch(err) {
      console.log(err, "<<<< error in addProduct Product Controller");
      return next(err);
    }
  }

  static async showAllProduct(req, res, next) {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);
    } catch(err) {
      console.log(err, "<<<< error in showAllProduct Product Controller");
      return next(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const product = await Product.findByPk(+req.params.id);
      return res.status(200).json(product);
    } catch(err) {
      console.log(err, "<<<< error in getProductById Product Controller");
      return next(err);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { name, image_url, price, stock, category } = req.body;
      const product = await Product.update({
        name,
        image_url, 
        price,
        stock,
        category
      }, {
        where: {
          id: +req.params.id
        },
        returning: true
      });
      return res.status(200).json(product[1][0]);
    } catch(err) {
      console.log(err, "<<<< error in updateProduct Product Controller");
      return next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const product = await Product.destroy({
        where: {
          id: +req.params.id
        }
      });
      return res.status(200).json({ message: "Product has been deleted successfully" });
    } catch(err) {
      console.log(err, "<<<< error in deleteProduct Product Controller");
      return next(err);
    }
  }

}

module.exports = ProductController;