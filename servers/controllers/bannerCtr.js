const {Banner} = require(`../models`)
class Controller {
    static async add(req, res, next){
        const {title, image_url} = req.body
        try{
            const banner = await Banner.create({title, image_url})
            if(banner){
                return res.status(201).json({
                    message: "Successfully create new product",
                    data: banner
                })
            } else {
                throw { message: "Bad request", statusCode: 400}
            }
        }catch(err){
            return next(err)
        }
    }

    static async getAllBanners(req, res, next){
        try{
            const banners = await Banner.findAll()
            if(banners.length > 0){
                return res.status(200).json({
                    data: banners
                })
            } else {
                return res.status(204).json({
                    data: banners
                })
            }
        }catch(err){
            return next(err)
        }
    }

    static async findOne(req, res, next){
        const {id} = req.params
        try{
            const banners = await Banner.findByPk(id)
            if(banners){
                return res.status(200).json({
                    data: banners
                })
            } else {
                throw {message: "Products not found", statusCode: 404}
            }
        }catch(err){
            return next(err)
        }
    }

    static async update(req, res, next){
        const {title, image_url} = req.body
        const {id} = req.params
        
        try{
            const banner = await Banner.update({title, image_url}, {where: {id}})
            if(!banner){
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
            const banner = await Banner.destroy({where: {id}})
            if(!banner){
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