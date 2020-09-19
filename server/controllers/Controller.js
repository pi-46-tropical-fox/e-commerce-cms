const { User, Product } = require('../models')

class Controller {
    static getProducts(req, res) {
        Product.findAll()
        .then(result => {
            res.status(200).json(result)
        })
    }
    static createProduct(req, res) {
        const params = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        console.log(params);
        Product.create(params)
        .then(result => {
            console.log(result);
            res.status(200).json({msg:'success adding product', id: result.id})
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({msg: 'failed to add product'})
        })
    }
    static getProductById(req, res) {
        Product.findByPk(req.params.id)
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({msg: 'failed to get product by id'})
        })
    }
    static editProduct(req, res) {
        const params = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(params, {where:{id: req.params.id}})
        .then(result => {
            console.log(result);
            res.status(201).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({msg: 'failed to update product'})
        })

    }
    static deleteProduct(req, res) {
        Product.destroy({where:{id: req.params.id}})
        .then(result => {
            console.log(result);
            res.status(200).json({msg:'success deleting product'})
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({msg:'failed to delete data'})
        })
    }
}

module.exports = Controller