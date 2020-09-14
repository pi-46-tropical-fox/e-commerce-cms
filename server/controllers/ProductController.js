const { Product } = require("../models");

class ProductController {
  static show(req, res) {
    Product.findAll()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
  static add(req, res) {
    let params = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      // UserId: req.userData.id,
    };
    Product.create(params)
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
  static find(req, res) {
    Product.findByPk(req.params.id)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
  static edit(req, res) {
    let params = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
    };
    Product.update(params, { where: { id: req.params.id }, returning: true })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
  static delete(req, res) {
    let options = {
      where: {
        id: req.params.id,
      },
      returning: true,
    };
    Product.destroy(options)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
}

module.exports = ProductController;
