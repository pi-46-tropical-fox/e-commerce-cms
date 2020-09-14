const {Product} = require('../models')

class ProductController {

    static getProducts(req,res,next) {
        Product.findAll()
            .then(products => {
                console.log('ini product',products);
                res.status(200).json({products})
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({message: err.message})
            })
    }
    
    static postProducts(req,res,next) {
        
        const {name,image_url,price,stock} = req.body
        
        Product.create({name,image_url,price,stock})
            .then(product => {
                res.status(201).json({product})
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({message: err.message})
            })
        
    }
}

module.exports = ProductController