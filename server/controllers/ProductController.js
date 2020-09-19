const {Product, Category} = require('../models')

class ProductController {
    static async createNewProduct(req, res, next){
        try {
            let obj = {
                name: req.body.name.trim(),
                img_url: req.body.img_url.trim(),
                color: req.body.color.trim(),
                capacity: req.body.capacity.trim(),
                price: req.body.price,
                stock: req.body.stock,
                CategoryId: req.body.CategoryId
            }
            const product = await Product.create(obj)
            return res.status(201).json({product, message: 'New product has been added'})
        } catch (err) {
            return next(err)
        }
    }
    static async showAllProduct(req, res, next){
        try {
            const products = await Product.findAll({
                include: [{
                    model: Category,
                    attributes: ['id','name']
                }]
            })
            return res.status(200).json(products)
        } catch (err) {
            return next(err)
        }
    }
    static async showProductById(req, res, next){
        try {
            const product = await Product.findOne({
                where: {
                    id : +req.params.productId
                }
            })
            return res.status(200).json(product)
        } catch (err) {
            return next(err)
        }
    }
    static async updateProduct(req, res, next){
        try {
            let obj = {
                name: req.body.name.trim(),
                img_url: req.body.img_url.trim(),
                color: req.body.color.trim(),
                capacity: req.body.capacity.trim(),
                price: req.body.price,
                stock: req.body.stock,
                CategoryId: req.body.CategoryId
            }
            const product = await Product.update(obj, {
                where: {
                    id : +req.params.productId
                }
            })
            return res.status(200).json({message: 'Product has been updated'})
        } catch (err) {
            return next(err)
        }
    }
    static async deleteProduct(req, res, next){
        try {
            const product = await Product.destroy({
                where: {
                    id : +req.params.productId
                }
            })
            return res.status(200).json({message: 'Product has been deleted'})
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = ProductController