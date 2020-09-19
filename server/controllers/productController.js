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

    static addProduct(req, res, next) {
        let params = {
            name: req.body.name,
            gender: req.body.gender,
            category: req.body.category,
            diameter: req.body.diameter,
            movement: req.body.movement,
            description: req.body.description,
            image: req.body.image,
            stock: req.body.stock,
            price: req.body.price
        }
        Product.create(params)
        .then(data => {
            return res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static getOneProduct(req, res, next) {
        Product.findOne({where: {id:req.params.productId}})
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static updateProduct(req, res, next) {
        let params = {
            name: req.body.name,
            gender: req.body.gender,
            category: req.body.category,
            diameter: req.body.diameter,
            movement: req.body.movement,
            description: req.body.description,
            image: req.body.image,
            stock: req.body.stock,
            price: req.body.price
        }
        Product.update(params, {where:{id:req.params.productId}})
        .then(data => {
            return res.status(200).json({message: 'update successful'})
        })
        .catch(err => {
            return next(err)
        })
    }

    static deleteProduct(req, res, next) {
        Product.destroy({where: {
            id:req.params.productId
        }})
        .then(  data => {
             return res.status(200).json({message: 'delete item successful'})
        })
        .catch(err => {
            return next(err)
        })
    }

}

module.exports = ProductController