const { Banner } = require('../models')

class BannerController{
    static addBanner(req, res, next) {
        let bannerObj = {
            title: req.body.title,
            status: req.body.status,
            category: req.body.category
        }

        Banner.create(bannerObj)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static getBanner(req, res, next) {
        Banner.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static getBannerId(req, res, next) {
        Banner.findByPk(req.params.id)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static updateBanner(req, res, next) {
        let bannerObj = {
            title: req.body.title,
            status: req.body.status,
            category: req.body.category
        }

        Banner.update(bannerObj, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if(!data) {
                    throw {message: 'Banner not found', statusCode: 404}
                }
                return res.status(200).json({message: "Update sucessfully!"})
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static deleteBanner(req, res, next) {
        Banner.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if(!data) {
                    throw {message: 'Banner not found', statusCode: 404}
                }
                return res.status(200).json({message: "Delete sucessfully!"})
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }
}


module.exports = BannerController