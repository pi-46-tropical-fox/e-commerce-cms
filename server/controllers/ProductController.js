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

    static getAllProduct(req, res) {
        Product.findAll()
        .then(product => {
            return res.status(200).json(product)
        })
        .catch(err => {
            return res.status(400).json(err)
        })
    }

    static detailProduct(req, res) {
        Product.findByPk(req.params.id)
        .then(product => {
            return res.status(200).json(product)
        })
        .catch(err => {
            return res.status(400).json(err)
        })
    }

    static updateProduct(req, res) {
        let productObj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.update(productObj, {
            where: {
                id: req.params.id
            }
        })
        .then(product => {
            return res.status(200).json(product)
        })
        .catch(err => {
            return res.status(400).json(err)
        })
    }

    static deleteProduct(req, res) {
        let productDelete = {}

        Product.findByPk(req.params.id)
        .then(data => {
            productDelete = data
            return data.destroy()
        })
        .then(data => {
            return res.status(200).json(productDelete)
        })
        .catch(err => {
            return res.status(400).json(err)
        })
    }
}

module.exports = ProductController