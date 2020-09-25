const { Product, User } = require('../models');

class ProductController {
  static createProduct(req, res, next) {
    const product = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }
    Product
      .create(product)
      .then(product => {
        return res.status(201).json(product);
      })
      .catch(err => {
        return res.status(400).json(err);
      })
  }
  static getProduct(req, res, next) {
    Product
      .findAll()
      .then(products => {
        return res.status(200).json(products);
      })
      .catch(err => {
        return res.status(400).json(err);
      })
  }
  static getProductById(req, res, next) {
    Product
      .findOne({where: {id:req.params.id}})
      .then(product => {
        res.status(200).json(product)
      })
      .catch(err => {
        return res.status(400).json(err)
      })
  }
  static updateProduct(req, res, next) {
    const {name, image_url, price, stock} = req.body;
    Product
      .update({name, image_url, price, stock}, {where: {id: req.params.id}})
      .then(result => {
        if(!result[0]) {
          return res.status(400).json({message: "product not found"})
        } else {
          res.status(200).json({message: "successfully update Product"})
        }
      })
      .catch(err => {
        return res.status(400).json(err)
      })
  }
  static deleteProduct(req, res, next) {
    Product
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        if(!result) {
          return res.status(400).json({message: "failed to delete"})
        } else {
          res.status(200).json({message: "successfully delete"});
        }
      })
      .catch(err => {
        return res.status(400).json(err);
      })
  }
}

module.exports = ProductController