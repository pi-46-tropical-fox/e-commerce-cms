const{User,Product} = require('../models')


class Controller {
    static list(req,res,next){
        Product.findAll()
        .then(data=>{
           return res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static add(req,res,next){
        let params = {
            name:req.body.name,
            image_url:req.body.image_url,
            price:req.body.price,
            stock:req.body.stock
        }
        Product.create(params)
        .then(data=>{
            return res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static getOne(req,res,next){
        let id ={where:{id:req.params.id}}
        Product.findOne(id)
        .then(data=>{
            console.log(data,'<<<< controller getone')
            return res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static edit(req,res,next){
        let params = {
            name:req.body.name,
            image_url:req.body.image_url,
            price:req.body.price,
            stock:req.body.stock
        }
        let id ={where:{id:req.params.id}}
        Product.update(params,id)
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static delete (req,res,next){
        let id ={where:{id:req.params.id}}
        Product.destroy(id)
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

}

module.exports = Controller