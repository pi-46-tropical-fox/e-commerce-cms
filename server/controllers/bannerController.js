const { Banner } = require('../models')

class BannerController {
    static show (req, res, next) {
        Banner.findAll()
            .then(banner => {
                return res.status(200).json(banner)
            })
            .catch( err => {
                return next(err)
            })
    }

    static add (req, res, next) {
        const dataBanner = {
            title: req.body.title,
            status: req.body.status,
            image_url: req.body.image_url 
        }

        Banner.create(dataBanner)
            .then( banner => {
                return res.status(201).json(banner)
            })
            .catch( err => {
                return next(err)
            })
    }

    static edit (req, res, next) {
        let id = req.params.id

        Banner.findOne({where: {id}})
            .then(banner => {
                return res.status(200).json(banner)
            })
            .catch( err => {
                return next(err)
            })
    }

    static editPost (req, res, next) {
        const editBanner = {
            title: req.body.title,
            status: req.body.status,
            image_url: req.body.image_url 
        }

        Banner.update(editBanner, {where: { id: req.params.id}})
            .then( result => {
                return res.status(201).json({message: `Successfully update Product with id ${req.params.id}`})
            })
            .catch( err => {
                return next(err)
            })
    }

    static delete (req, res, next) {
        Banner.destroy({ where: { id: req.params.id }})
        .then(result => {
        
            return res.status(200).json({message: `Successfully delete Product with id ${req.params.id}`})
        })
        .catch( err => {
            return next(err)
        })
    }

}

module.exports = BannerController