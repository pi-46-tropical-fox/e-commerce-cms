const { Banner } = require('../models')

class BannerController {
    static async read(req, res, next) {
        try {
            let data = await Banner.findAll()

            res.status(200).json({ data })
        } catch (e) {
            return next(e)
        }
    }

    static async readOne(req, res, next) {
        try {
            let data = await Banner.findByPk(req.params.id)

            res.status(200).json({ data })
        } catch (e) {
            return next(e)
        }
    }

    static async create(req, res, next) {
        try {
            let { name, banner_title, banner_description, status, image_url } = req.body
            let input = { name, banner_title, banner_description, status, image_url }

            await Banner.create(input)

            res.status(201).json({ message: "A banner has been successfully created." })
        } catch (e) {
            return next(e)
        }
    }

    static async update(req, res, next) {
        try {
            let { id } = req.params
            let { name, banner_title, banner_description, status, image_url } = req.body
            let input = { name, banner_title, banner_description, status, image_url }

            await Banner.update(input, { where: { id } })

            res.status(200).json({ message: "Banner has been successfully updated." })
        } catch (e) {
            return next(e)
        }
    }

    static async delete(req, res, next) {
        try {
            let { id } = req.params

            await Banner.destroy({ where: { id } })

            res.status(200).json({ message: "Banner has been deleted." })
        } catch (e) {
            return next(e)
        }
    }

}

module.exports = BannerController