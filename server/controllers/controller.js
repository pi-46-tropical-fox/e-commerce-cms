const{User,Product} = require('../models')
const { param } = require('../routes')


class Controller {
    static list(req,res){
        Product.findAll()
        .then(data=>{
           return res.status(200).json(data)
        })
        .catch(err=>{
            return res.status(400).json(err)
        })
    }
    static add(req,res){
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
            return res.status(400).json(err)
        })
    }
    static getOne(req,res){
        let id ={where:{id:req.params.id}}
        Product.findOne(id)
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            return res.status(404).json(err)
        })
    }
    static edit(req,res){
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
            return res.status(400).json(err)
        })
    }
    static delete (req,res){
        let id ={where:{id:req.params.id}}
        Product.destroy(id)
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            return res.status(400).json(err)
        })
    }

}

module.exports = Controller