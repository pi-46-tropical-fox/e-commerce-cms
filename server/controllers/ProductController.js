const { Product, ProductImage, Category } = require('../models')

class ProductController{
    static async read(req, res, next){
        try {
            let data = await Product.findAll({
                include: [
                    {
                        model: Category
                    },
                    {
                        model: ProductImage
                    }
                ]
            })

            res.status(200).json({ data })
        } catch (e) {
            return next(e)
        }
    }
    
    static async readOne(req, res, next){
        try {
            let data = await Product.findByPk(req.params.id, {
                include: [
                    {
                        model: Category
                    },
                    {
                        model: ProductImage
                    }
                ]
            })

            res.status(200).json({ data })
        } catch (e) {
            return next(e)
        }
    }
    
    static async create(req, res, next){
        try {
            let { name, price, stock, CategoryId } = req.body

            let input = { name, price, stock, CategoryId }

            await Product.create(input)

            res.status(201).json({ message: "A product has been successfully created." })
        } catch (e) {
            return next(e)
        }
    }
    
    static async update(req, res, next){
        try {
            let { name, price, stock, CategoryId } = req.body
            let input = { name, price, stock, CategoryId }

            await Product.update(input, { where: { id: req.params.id } })

            res.status(200).json({ message: "Product has been successfully updated." })
        } catch (e) {
            return next(e)
        }
    }
    
    static async delete(req, res, next){
        try {
            let { id } = req.params

            await Product.destroy({ where: { id } })

            res.status(200).json({ message: "Product has been deleted." })
        } catch (e) {
            return next(e)
        }
    }
    
}

module.exports = ProductController