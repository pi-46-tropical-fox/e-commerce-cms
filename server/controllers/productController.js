const { Product } = require('../models')

class ProductController {
    static show ( req, res, next ) {
        Product.findAll()
            .then(products => {
                return res.status(200).json(products)
            })
            .catch(err => {
                return next(err)
            })
    }

    static showByGender ( req, res, next ) {
        const gender = req.params.gender
        Product.findAll({where: {gender}})
            .then(products => {
                return res.status(200).json(products)
            })
            .catch(err => {
                return next(err)
            })
    }

    static showByCategory ( req, res, next ) {
        const CategoryId = req.params.CategoryId
        Product.findAll({where: {CategoryId}})
            .then(products => {
                return res.status(200).json(products)
            })
            .catch(err => {
                return next(err)
            })
    }

    static addProduct ( req, res, next ) {
        const dataProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            gender: req.body.gender,
            CategoryId: req.body.CategoryId,
        }

        Product.create(dataProduct)
            .then(product => {
                return res.status(201).json(product)
            })
            .catch( err => {
                return next(err)
            })
    }

    static editProduct ( req, res, next ) {
        const id = req.params.id

        Product.findByPk(id)
            .then( product => {
                return res.status(200).json({product})
            })
            .catch( err => {
                return next(err)
            })
    }

    static editPostProduct ( req, res, next ) {
        const editProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            gender: req.body.gender,
            CategoryId: req.body.CategoryId,
        }

        Product.update(editProduct,{where: { id: req.params.id}})
            .then(product => {
                return res.status(201).json({message: `Successfully update Product with id ${req.params.id}`})
            })
            .catch( err => {
                return next(err)
            })
    }

    static updateStock ( req, res, next ) {
        const editProduct = {
            stock: req.body.stock
        }

        Product.update(editProduct,{where: { id: req.params.id}})
            .then(product => {
                return res.status(201).json({message: `Successfully update Product with id ${req.params.id}`})
            })
            .catch( err => {
                return next(err)
            })
    }


    static deleteProduct ( req, res, next ) {
        Product.destroy({ where: { id: req.params.id }})
            .then(result => {
        
                return res.status(200).json({message: `Successfully delete Product with id ${req.params.id}`})
            })
            .catch( err => {
                return next(err)
            })
    }
}

module.exports = ProductController