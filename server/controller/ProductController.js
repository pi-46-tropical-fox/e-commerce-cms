const { Product } = require('../models')

class ProductController{
    static async getProducts(req, res){
        const products = await Product.findAll()

        res.status(200).json(products)
    }

    static createProduct(req, res){
        const { name, image_url, price, stock } = req.body
    }

    static editProduct(req, res){

    }

    static deleteProduct(req, res){

    }
}

module.exports = ProductController
