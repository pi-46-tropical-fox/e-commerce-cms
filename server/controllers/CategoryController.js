const { Category } = require('../models')

class CategoryController {
    static async read(req, res, next) {
        try {
            let data = await Category.findAll()

            res.status(200).json({ data })
        } catch (e) {
            return next(e)
        }
    }

    static async readOne(req, res, next) {
        try {
            let data = await Category.findByPk(req.params.id)

            res.status(200).json({ data })
        } catch (e) {
            return next(e)
        }
    }

    static async create(req, res, next) {
        try {
            let { name, description } = req.body

            await Category.create({ name, description })

            res.status(201).json({ message: "Successfully created new category." })
        } catch (e) {
            return next(e)
        }
    }

    static async update(req, res, next) {
        try {
            let { name, description } = req.body

            await Category.update({ name, description }, { where: { id: req.params.id } })

            res.status(200).json({ message: "Successfully updated category." })
        } catch (e) {
            return next(e)
        }
    }

    static async delete(req, res, next) {
        try {
            let { id } = req.params

            await Category.destroy({ where: { id } })

            res.status(200).json({ message: "Category has been deleted." })
        } catch (e) {
            return next(e)
        }
    }

}

module.exports = CategoryController