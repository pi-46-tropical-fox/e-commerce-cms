const {Product, User} = require('../models')

class ProductController {
    static addProduct(req, res) {
        let productObj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.create(productObj)
        .then(product => {
            return res.status(201).json(product)
        })
        .catch(err => {
            return res.status(400).json(err)
        })
    }
}

module.exports = ProductController