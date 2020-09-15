const { response } = require('../app')
const { Product } = require('../models')
const { format } = require('../helpers/currencyFormatter')

class ProductController {
    static create(req, res, next) {
        const params = {
            name: req.body.name,
            imageURL: req.body.imageURL,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        }
        Product.create(params)
            .then(response => {
                res.status(201).json({
                    message: 'Product has been successfully added',
                    name: response.name,
                    stock: response.stock,
                    price: format(response.price)
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        const { id } = req.params;
        const params = {...req.body }
        Product.update(params, { where: { id } })
            .then(data => {
                res.status(200).json({
                    message: 'Product has been successfully updated',
                    ...params
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        const { id } = req.params;
        Product.destroy({ where: { id } })
            .then(data => {
                res.status(200).json({
                    message: 'Product has been successfully deleted'
                })
            })
            .catch(err => {
                next(err)
            })
    }

}


module.exports = ProductController