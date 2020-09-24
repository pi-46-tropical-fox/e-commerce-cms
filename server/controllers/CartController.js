const { Cart, CartProduct, Product } = require('../models')
const cartproduct = require('../models/cartproduct')

class CartController {
    static async read(req, res, next) {
        try {
            let data = await Cart.findOne({
                where: {
                    checkedOut: false
                },
                include: {
                    model: CartProduct
                }
            })

            res.status(200).json({ data })
        } catch (e) {
            return next(e)
        }
    }

    static async create(req, res, next) {
        try {
            let cart = await Cart.findOrCreate({
                where: {
                    UserId: req.user.id,
                    checkedOut: false
                }
            })

            let input = {
                CartId: cart.id,
                ProductId: req.params.id
            }

            let cartProduct = await CartProduct.findOne({
                where: input
            })

            if (cartProduct) {
                await CartProduct.update({ qty: ++cartProduct.qty }, { where: input })

                res.status(200).json({ message: "A product has been already in your cart, so we updated it." })
            } else {
                input.qty = 1

                await CartProduct.create(input)

                res.status(201).json({ message: "Yeay! You've added the product into your cart." })
            }
        } catch (e) {
            return next(e)
        }
    }

    static async update(req, res, next) {
        try {
            let input = {
                qty: req.body.qty
            }

            let data = await CartProduct.update(input, {
                where: {
                    id: req.params.id
                }
            })

            res.status(200).json({ message: "A product has been updated." })
        } catch (e) {
            return next(e)
        }
    }

    static async checkout(req, res, next) {
        try {
            let data = await Cart.findOne({
                where: {
                    id: req.params.id,
                    checkedOut: false
                },
                include: {
                    model: CartProduct
                }
            })

            Cart.update({ checkedOut: true }, {
                where: {
                    id: req.params.id,
                    checkedOut: false
                }
            })

            data.CartProduct.forEach(async cartProduct => {
                let product = Product.findByPk(cartProduct.ProductId)

                await Product.update({
                    stock: product.stock - cartProduct.qty
                }, {
                    where: {
                        CartId: req.params.id,
                        ProductId: cartProduct.ProductId
                    }
                })
            })

            res.status(200).json({ message: "You've successfully checked out products." })
        } catch (e) {
            return next(e)
        }
    }

    static async delete(req, res, next) {
        try {
            let data = await Cart.destroy({
                where: {
                    id: req.params.id,
                    checkedOut: false,
                }
            })

            res.status(200).json({ message: "You've successfully cleared your cart." })
        } catch (e) {
            return next(e)
        }
    }

    static async deleteOne(req, res, next) {
        try {
            let data = await CartProduct.destroy({
                where: {
                    CartId: req.params.id,
                    ProductId: req.body.ProductId,
                }
            })

            res.status(200).json({ message: "You've successfully deleted a product from your cart." })
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = CartController