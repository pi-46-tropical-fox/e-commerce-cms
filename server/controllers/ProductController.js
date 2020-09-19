const { Product } = require('../models')

class Controller {
    static async getAllProduct(req, res, next) {
        try {
            const fetched = await Product.findAll()

            res.status(200).json({ data: fetched, message: 'Product Fetched Successfully' })
        } catch (err) {
            next(err)
        }
    }

    static async createProduct(req, res, next) {
        try {
            const payload = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            }

            const createdProduct = await Product.create(payload)

            res.status(201).json({ data: createdProduct, message: 'Product Listed Successfully' })
        } catch (err) {
            next(err)
        }
    }

    static async editProduct(req, res, next) {
        try {
            const payload = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            }

            await Product.update(payload, { where: { id: req.params.id } })
            res.status(200).json({ message: 'Data Successfully Edited' })

        } catch (err) {
            next(err)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const { id } = req.params

            await Product.destroy({ where: { id } })

            res.status(200).json({ message: 'deleted successfully' })
        } catch (err) {
            next(err)
        }
    }

    static async getDetailProduct(req, res, next) {
        try {
            const { id } = req.params

            const data = await Product.findOne({where : { id }})

            if(data) {
                res.status(200).json(data)
            } else {
                throw { message: '404 Not Found', statusCode: 404 }
            }

        } catch(err) {
            next(err)
        }
    }
}

module.exports = Controller