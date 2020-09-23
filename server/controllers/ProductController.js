const { Product } = require('../models')

class ProductController {
    static getProduct (req, res) {
        Product.findAll()
        .then(product =>{
            return res.status(200).json(product)
        })
        .catch(err =>{
            return res.status(400).json(err)
        })
    }

    static addProduct (req, res) {
        Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        })
        .then(data=>{
            return res.status(201).json(data)
        })
        .catch(errors =>{
            return res.status(400).json(errors)
        })
    }

    static findProduct(req, res) {
        Product.findByPk(req.params.id)
        .then((data) => {
            return res.status(200).json(data);
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
    }

    static updateProduct (req, res) {
        Product.update({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
        },{where: {id: req.params.id}})
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(errors =>{
            return res.status(400).json(errors)
        })
    }

    static deleteProduct (req, res) {
        let options = {
            where: {
                id: req.params.id,
            },
            returning: true,
        };
        Product.destroy(options)
        .then((data) => {
            return res.status(200).json(data);
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
    }
}

module.exports = ProductController 