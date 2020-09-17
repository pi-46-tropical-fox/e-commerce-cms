const { Product } = require('../models');

class ProductController {
    static async showProducts(req, res) {
        try{
            const product = await Product.findAll({order: ['id']})
            return res.status(200).json(product)
        }
        catch(err) {
            console.log(err, '<<<< Error di Show Product');
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async addProduct(req, res) {
        try{
            const { name, image_url, price, stock } = req.body
            const product = await Product.create({name, image_url, price, stock})
            return res.status(201).json(product)
        }
        catch(err) {
            console.log(err, '<<<< Error di Add Product');
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async getProductById(req, res) {
        try{
            const { productId } = req.params
            const product = await Product.findOne({where: {id: productId}})
            return res.status(200).json(product)
        }
        catch(err) {
            console.log(err, '<<<< Error di Get Product By Id');
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async updateProduct(req, res) {
        try{
            const { name, image_url, price, stock } = req.body
            const { productId } = req.params
            const product = await Product.update({name, image_url, price, stock}, {where: {id: productId}})
            return res.status(200).json(product)
        }
        catch(err) {
            console.log(err, '<<<< Error di Update Product');
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async deleteProduct(req, res) {
        try{
            const { productId } = req.params
            const product = await Product.destroy({where: {id: productId}})
            return res.status(200).json(product)
        }
        catch(err) {
            console.log(err, '<<<< Error di Delete Product');
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}

module.exports = ProductController