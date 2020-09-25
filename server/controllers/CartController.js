const { Cart, CartProduct, Product, ProductImage } = require('../models')
const cartproduct = require('../models/cartproduct')

class CartController {
    static async read(req, res, next) {
        try {
            let data = await Cart.findOne({
                where: {
                    checkedOut: false,
                    UserId: req.user.id
                },
                include: {
                    model: CartProduct,
                    include: {
                        model: Product,
                        include: ProductImage
                    }
                }
            })

            res.status(200).json({ data })
        } catch (e) {
            return next(e)
        }
    }

    static async create(req, res, next) {
        try {
            let message = `Yeay! You've added the product into your cart.`
            let code = 201
            let totalAmount = 0

            let cart = await Cart.findOrCreate({
                where: {
                    UserId: req.user.id,
                    checkedOut: false
                }
            })

            cart = cart[0]

            let input = {
                CartId: cart.id,
                ProductId: req.body.id,
            }

            let cartProduct = await CartProduct.findOne({
                where: input
            })

            if (cartProduct) {
                await CartProduct.update({ qty: ++cartProduct.qty }, { where: input })

                message = `A product has been already in your cart, so we updated it.`
                code = 200
            } else {
                let product = await Product.findByPk(req.body.id)

                input.price = product.price
                input.qty = 1

                await CartProduct.create(input)
            }

            cart = await Cart.findOne({
                where: {
                    UserId: req.user.id,
                    checkedOut: false
                },
                include: CartProduct
            })

            console.log(cart);

            cart.CartProducts.forEach(product => {
                totalAmount += product.qty * product.price
            })

            res.status(code).json({ message })
        } catch (e) {
            return next(e)
        }
    }

    static async updatePrice(req, res, next) {
        try {
            let cart = await Cart.findOne({
                where: {
                    checkedOut: false,
                    UserId: req.user.id
                },
                include: {
                    model: CartProduct,
                    include: {
                        model: Product
                    }
                }
            })

            let totalAmount = 0

            cart.CartProducts.forEach(product => {
                let value = product.price * product.qty
                totalAmount += value
            })

            console.log(totalAmount);

            // let input = {
            //     CartId: cart[0].id,
            //     ProductId: req.body.id
            // }

            // let cartProduct = await CartProduct.findOne({
            //     where: input
            // })

            // if (cartProduct) {
            //     await CartProduct.update({ qty: ++cartProduct.qty }, { where: input })

            //     res.status(200).json({ message: "A product has been already in your cart, so we updated it." })
            // } else {
            //     input.qty = 1

            //     await CartProduct.create(input)

            //     res.status(201).json({ message: "Yeay! You've added the product into your cart." })
            // }
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