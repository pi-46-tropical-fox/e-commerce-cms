const {Product} = require ("../models")

class ProductController {
    static addProducts (req, res) {
        let params = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.create (params)

        .then (data => {
            return res.status (201).json (data)
        })

        .catch (err => {
            console.log (err)
            // return res.status (400).json ({message : Bad Request - Error Validation})
        })

    }

    // static getProducts (req, res) {

    // }

    // static editProducts (req, res) {

    // }


    // static deleteProducts (req, res) {

    // }

    

}

module.exports = ProductController