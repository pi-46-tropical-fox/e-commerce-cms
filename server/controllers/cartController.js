const { Cart } = require('../models')

class CartController {
    static show (req, res, next) {
        const UserId = req.userData.id
        Cart.findAll({
            where: {UserId},
            include: ['Product']
        })
            .then(cart => {
                return res.status(200).json(cart)
            })
            .catch( err => {
                return next(err)
            })
    }

    static addCart (req, res, next) {
        const dataCart = {
            UserId: req.body.UserId,
            ProductId: req.body.ProductId,
            quantity: req.body.quantity
        }

        Cart.create(dataCart)
            .then( cart => {
                return res.status(201).json(cart)
            })
            .catch( err => {
                return next(err)
            })
    }

    static editCart (req, res, next) {
        let id = req.params.id

        Cart.findOne({where: {id}, include: ['Product']})
            .then(cart => {
                return res.status(200).json(cart)
            })
            .catch( err => {
                return next(err)
            })
    }

    static findByProduct (req, res, next) {
        let ProductId = req.params.id

        Cart.findOne({where: {ProductId}})
            .then(cart => {
                return res.status(200).json(cart)
            })
            .catch( err => {
                return next(err)
            })
    }

    static editPostCart (req, res, next) {
        const editCart = {
            UserId: req.body.UserId,
            ProductId: req.body.ProductId,
            quantity: req.body.quantity 
        }

        Cart.update(editCart, {where: { id: req.params.id}})
            .then( result => {
                return res.status(201).json({message: `Successfully update Cart`})
            })
            .catch( err => {
                return next(err)
            })
    }

    static deleteCart (req, res, next) {
        Cart.destroy({ where: { id: req.params.id }})
            .then(result => {
                return res.status(200).json({message: `Successfully delete Cart Item`})
            })
            .catch( err => {
                return next(err)
            })
    }

}

module.exports = CartController