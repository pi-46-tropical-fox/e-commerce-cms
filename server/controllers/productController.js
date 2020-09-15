const { Product } = require('../models')

class ProductController{
    static addProduct(req, res, next) {
        let productObj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        }

        Product.create(productObj)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static getProduct(req, res, next) {
        Product.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static getProductId(req, res, next) {
        Product.findByPk(req.params.id)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static updateProduct(req, res, next) {
        let productObj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        }

        Product.update(productObj, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if(!data) {
                    throw {message: 'Product not found', statusCode: 404}
                }
                return res.status(200).json({message: "Update sucessfully!"})
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static deleteProduct(req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if(!data) {
                    throw {message: 'Product not found', statusCode: 404}
                }
                return res.status(200).json({message: "Delete sucessfully!"})
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }
}


module.exports = ProductController