const { User, Product } = require('../models')
const { authentication, authorization } = require('../middlewares/auth.js')

class Controller{
    static show(req,res,next){
        Product.findAll()
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch(err =>{
            return next(err)
            // return res.status(400).json({message: 'Data not found'})
        })
    }

    static add(req,res,next){
        let params = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock,
            category : req.body.category
        }

        Product.create(params)
        .then(data =>{
            return res.status(201).json(data)
        })
        .catch(err =>{
            // console.log(err, 'ini controller')
            return next(err)
            // return res.status(404).json({message: 'Not Found'})
        })
    }

    static find(req,res,next){
        Product.findOne({where:{id:req.params.id}})
        .then(data =>{
            return res.status(201).json(data)
        })
        .catch(err =>{
            return next(err)
        })
    }

    static edit(req,res,next){
        let id = {where:{id: req.params.id}}
        const params = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock,
            category : req.body.category
        }
        Product.update(params,id)
        .then(data =>{
            return res.status(201).json(data)
        })
        .catch(err =>{
            return next(err)
        })
    }

    static remove(req,res,next){
        let id = {where:{id: req.params.id}}
        Product.destroy(id)
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch(err =>{
            console.log(err, 'ini error delete')
            return next(err)
        })
    }
}

module.exports = Controller