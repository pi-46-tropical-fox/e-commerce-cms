const {Product} = require ("../models")

class ProductController {
    static addProducts (req, res) {
        let params = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        
        return Product.create (params)

        .then (data => {
            // console.log (data, ">>>>>ini dari data controller")
            return res.status (201).json (data)
        })

        .catch (err => {
            // console.log (err, ">>>>>> ini dari err controller")
            return res.status (400).json ({message : "Bad Request - Error Validation"})
        })

    }

    static getProducts (req, res) {
        Product.findAll ()

        .then (data => {
            return res.status (200).json (data)
        })

        .catch (err => {
            console.log (err)
        })

    }

    static getProductbyId (req, res) {
        Product.findByPk (req.params.id)

        .then (data => {
            return res.status (200).json (data)
        })

        .catch (err => {
            console.log (err)
        })
    }

    static editProducts (req, res) {
        let params = {
            name : req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update (params, {
            where: {id : req.params.id}
        })

        .then (data => {
            if (!data) {
                return res.status (400).json ({message : "Bad Request"})

            } else {
                return res.status (200).json (data)
            }
            
        })

        .catch (err => {
            console.log (err)
        })

    }

    static deleteProducts (req, res) {
        Product.destroy ({
            where: {id: req.params.id}
        })

        .then (data => {
            if (!data) {
                return res.status (400).json ({message : "Bad Request"})

            } else {
                return res.status (200).json (data)
            }
        })

        .catch (err => {
            console.log (err)
        })

    }

    

}

module.exports = ProductController