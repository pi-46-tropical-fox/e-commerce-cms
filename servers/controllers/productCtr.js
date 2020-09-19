const {Product} = require(`../models`)
class Controller {
    static async add(req, res, next){
        const {name, image_url, price, stock} = req.body
        try{
            const product = await Product.create({name, image_url, price, stock})
            if(product){
                return res.status(201).json({
                    message: "Successfully create new product",
                    data: {
                        name: product.name,
                        image_url: product.image_url,
                        price: product.price,
                        stock: product.stock
                    }
                })
            } else {
                throw { message: "Bad request", statusCode: 400}
            }
        }catch(err){
            return next(err)
        }
    }

    static async getAllProducts(req, res, next){
        try{
            const products = await Product.findAll()
            if(products.length > 0){
                return res.status(200).json({
                    data: products
                })
            } else {
                return res.status(204).json({
                    data: products
                })
            }
        }catch(err){
            return next(err)
        }
    }

    static async findOne(req, res, next){
        const {id} = req.params
        try{
            const products = await Product.findByPk(id)
            if(products){
                return res.status(200).json({
                    data: products
                })
            } else {
                throw {message: "Products not found", statusCode: 404}
            }
        }catch(err){
            return next(err)
        }
    }

    static async update(req, res, next){
        const {name, image_url, price, stock} = req.body
        const {id} = req.params
        
        try{
            const product = await Product.update({name, image_url, price, stock}, {where: {id}})
            if(!product){
                throw {message: "Product Not Found", statusCode: 404}
            } else {
                return res.status(200).json({
                    message: "Successfully update product"
                })
            }
        }catch(err){
            return next(err)
        }
    }

    static async delete(req, res, next){
        const {id} = req.params
        try{
            const product = await Product.destroy({where: {id}})
            if(!product){
                throw {message: "Product not found", statusCode: 404}
            } else {
                return res.status(200).json({
                    message: "Successfully delete product"
                })
            }
        }catch(err){
            return next(err)
        }
    }
}

module.exports = Controller