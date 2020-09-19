const { Product } = require('../models')

class ProductController{
    static async getProducts(req, res){
        const products = await Product.findAll()

        res.status(200).json(products)
    }

    static async getProductById(req, res, next){
        try{
            const { id } = req.params
        
            const product = await Product.findOne({ where : { id }})
    
            if(!product){
                throw { message : 'Not found', statusCode : 404 }
            }

            res.status(200).json(product)
        } catch (e){
            next(e)
        }
    }

    static async createProduct(req, res, next){
        try{
            console.log(req.body)
            const { name, image_url, price, stock } = req.body

            const created = await Product.create({ name, image_url, price, stock })

            res.status(201).json(created)
        } catch (e){
            next(e)
        }
    }

    static async editProduct(req, res, next){
        try{
            const { id } = req.params
            const { name, image_url, price, stock } = req.body

            const updated = await Product.update({ name, image_url, price, stock }, { where : { id }, returning : true, plain: true })

            res.status(200).json(updated[1].dataValues)
        } catch (e){
            next(e)
        }
    }

    static async deleteProduct(req, res, next){
        try{
            const { id } = req.params
            await Product.destroy({where : { id }})

            res.status(200).json({ message : 'Data deleted' })
        } catch (e){
            next(e)
        }
    }
}

module.exports = ProductController
