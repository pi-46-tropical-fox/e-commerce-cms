const {Product} = require(`../models`)

class ProductController {

    static read(req, res, next) {
        Product.findAll({order: [['createdAt', 'ASC']]})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            // console.log(err)
            next(err)
        })
    }

    static add(req, res, next) {
        const addProduct = {
            name: req.body.name, 
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock,
            category: req.body.category
        }
        Product.create(addProduct)
        .then(result => {
            // console.log(`ini result`, result
            res.status(201).json(result)
        })
        .catch(err => {
            console.log(`ini error di create`, err)
            next(err)
        })
    }

    static find(req, res, next) {
        let ProductId = req.params.id
        let error = {
            name: `otherError`,
            statusCode: 404,
            message: `Can't find the data.`
        }

        Product.findByPk(ProductId)
        .then(result => {
            if(result) {
                // console.log(`ini result`, result)
                res.status(200).json(result)
            } else {
                throw error
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static edit(req, res, next) {
        const editProduct = {
            name: req.body.name, 
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock,
            category: req.body.category
        }

        let ProductId = req.params.id
        Product.update(editProduct, {where: {id: ProductId}, returning: true})
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err, 'dari edit product');
            next(err)
        })
    }

    static delete(req, res, next) {
        let ProductId = req.params.id
        let error = {
            name: `otherError`,
            statusCode: 404,
            message: `Can't find the data.`
        }
        let deletedData;
        // console.log(`ini di dalam delete`)
        Product.findByPk(ProductId)
        .then(result => {
            if(!result) {
                throw error
            } else {
                deletedData = result
                return Product.destroy({where: {id: ProductId}})
            }
        })
        .then(result => {
            // console.log(`ini result`, result)
            res.status(200).json({message: `Successfully delete product '${deletedData.name}'!`})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController