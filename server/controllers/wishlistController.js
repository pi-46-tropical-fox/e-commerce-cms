const { Wishlist } = require('../models')

class WishlistController {
    static show (req, res, next) {
        const UserId = req.userData.id
        Wishlist.findAll({
            where: {UserId},
            include: ['Product']
        })
            .then(wishlist => {
                return res.status(200).json(wishlist)
            })
            .catch( err => {
                return next(err)
            })
    }

    static addWishlist (req, res, next) {
        const dataWishlist = {
            UserId: req.body.UserId,
            ProductId: req.body.ProductId
        }

        Wishlist.create(dataWishlist)
            .then( wishlist => {
                return res.status(201).json(wishlist)
            })
            .catch( err => {
                return next(err)
            })
    }

    static deleteWishlist (req, res, next) {
        Wishlist.destroy({ where: { id: req.params.id }})
        .then(result => {
            return res.status(200).json({message: `Successfully delete Wishlist with id ${req.params.id}`})
        })
        .catch( err => {
            return next(err)
        })
    }

}

module.exports = WishlistController