const {Product} = require('../models');

class ProductController{
    static async createProduct(req,res,next) {
        const {name,image_url,price,stock} = req.body

        try {
            let product = await Product.create({
                name,image_url,price,stock
            })
            res.status(201).json({name:product.name,price:product.price})
        } catch (err) {
            // if(err.errors[0].type === 'Validation error') {
            //     return res.status(400).json({message:err.errors[0].message})
            // } else {
            //     res.status(500).json({message:err.message})
            // }
            return next(err)
        }

    }

    static async showAllProduct (req,res,next) {
        try {
            let show = await Product.findAll()
            res.status(200).json(show)
        } catch (err) {
            return next(err)
        }
    }

    static async showIdProduct (req,res,next) {
        try {
            let product = await Product.findByPk(req.params.id)
            if(product) {
                res.status(200).json(product)
            } else {
                throw {message: 'Product not found', statusCode: 404}
            }
        } catch (err) {
            next(err)
        }
    }

    static async updateProduct(req,res,next) {
        // console.log(req.body)
        const {name,image_url,price,stock} = req.body
        const id = req.params.id

        try {
            let data = await Product.update(
                {
                    name,image_url,price:+price,stock:+stock
                }, 
                {where:{id:id}})
            if(data[0]) {
                res.status(200).json({message:'Succes update'})
            } else {
                throw {message: 'Product not found', statusCode: 404}
            }
        } catch (err) {
            // console.log(err);
            next(err)
            
        }
    }

    static async deleteProduct(req,res,next) {
        try {
            await Product.destroy({where:{id: req.params.id}})
            res.status(200).json({message: 'Succes delete'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProductController
