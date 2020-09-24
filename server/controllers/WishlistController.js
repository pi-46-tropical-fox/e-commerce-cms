const { Wishlist } = require('../models')

class WishlistController {
    static async read(req, res, next) {
        try {
            let data = await Wishlist.findAll()

            res.status(200).json({ data })
        } catch (e) {
            return next(e)
        }
    }
    static async create(req, res, next) { }
    static async delete(req, res, next) { }
}

module.exports = WishlistController