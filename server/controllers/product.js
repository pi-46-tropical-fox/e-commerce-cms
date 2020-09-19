const {User, Product, Category} = require('../models')

class ProductController {
    static async getItems (req, res, next) {
        try {
            const products = await Product.findAll({
                include: {
                    model: Category,
                    attributes: ['name']
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            const categories = await Category.findAll({
                attributes: ['id', 'name']
            })

            const sorted = {}

            categories.forEach(category => {
                if (!sorted[category.name]) {
                    sorted[category.name] = []
                }
            })

            products.forEach(product => {
                sorted[product.Category.name].push(product)
            })

            return res.status(200).json({products: sorted})
        } catch (err) {
            return next(err)
        }
    }

    static async newItem (req, res, next) {
        try {
            const item = req.body
            const created = await Product.create(item)
            const category = await Category.findByPk(created.category, {
                attributes: ['name']
            })
            return res.status(201).json({
                product: {
                    id: created.id,
                    name: created.name,
                    image_url: created.image_url,
                    price: created.price,
                    stock: created.stock,
                    category: category.name
                }
            })
        } catch (err) {
            return next(err)
        }
    }

    static async restockItem (req, res, next) {
        try {
            const {stock} = req.body

            if (Number(stock) < 0) throw {message: 'Restock value must be positive', status: 400}

            const current = await Product.findOne({
                where: {
                    id: req.params.id
                },
                attributes: ['stock']
            })

            let restocked = await Product.update({
                stock: Number(stock) + current.stock
            }, {
                where: {
                    id: req.params.id
                },
                returning: ['id', 'name', 'stock']
            })
            restocked = restocked[1][0]

            return res.status(200).json({
                product: {
                    id: restocked.id,
                    name: restocked.name,
                    stock: restocked.stock
                }
            })
        } catch (err) {
            return next(err)
        }
    }

    static async editItem (req, res, next) {
        try {
            const update = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                category: req.body.category
            }

            const filteredUpdate = {}

            Object.keys(update).forEach(attribute => {
                if (update[attribute]) filteredUpdate[attribute] = update[attribute]
            })

            let updated = await Product.update(filteredUpdate, {
                where: {
                    id: req.params.id
                },
                returning: true
            })

            updated = updated[1][0]

            const category = await Category.findByPk(updated.category, {
                attributes: ['name']
            })

            return res.status(200).json({
                product: {
                    id: updated.id,
                    name: updated.name,
                    image_url: updated.image_url,
                    price: updated.price,
                    category: category.name
                }
            })
        } catch (err) {
            return next(err)
        }
    }

    static async deleteItem (req, res, next) {
        try {
            await Product.destroy({
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json({
                message: 'Product deleted successfully'
            })
        } catch (err) {
            return next(err)
        }
    }
}

 module.exports = {
     ProductController
 }