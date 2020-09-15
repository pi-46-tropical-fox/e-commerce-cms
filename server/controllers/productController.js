const {Product} = require('../models')

class ProductController {

    static productList(req, res, next) {
        Product.findAll()
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(401).json(err)
        })
    }

    static addProduct(req, res, next) {}

    static updateProduct(req, res, next) {}

    static deleteProduct(req, res, next) {}

}

module.exports = ProductController