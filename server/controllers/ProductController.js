const {Product} = require('../models')

class ProductController {

    static getProducts(req,res,next) {
        Product.findAll()
            .then(products => {
                res.status(200).json({products})
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({message: err.message})
            })
    }
    
    static postProduct(req,res,next) {
        
        const {name,image_url,price,stock} = req.body
        
        Product.create({name,image_url,price,stock})
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({message: err.message})
            })
    }

    static editProduct(req,res,next) {
        const {name,image_url,price,stock} = req.body
        Product.update({name,image_url,price,stock}, {where: {id: req.params.id}})
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({message: err.message})
            })
    }

    static deleteProduct(req,res,next) {
        Product.destroy({where: {id : req.params.id}})
            .then(products => {
                
                res.status(200).json(products)
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({message: err.message})
            })
    }
}

module.exports = ProductController