const {Product} = require('../models')

class ProductController {
    static add(req,res){
        // console.log(req.body)
        Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            createdAt: new Date,
            updatedAt: new Date
        })
        .then(product=>{
            return res.status(201).json(product)
        })
        .catch(({errors})=>{
            console.log(errors[0].message, '<<<<< ini eror')
            return res.status(400).json({message: errors[0].message})
        })
    }
    static show(req,res){
        Product.findAll()
        .then(product=>{
            return res.status(200).json(product)
        })
        .catch(err=>{
            console.log(err, '<<<<< ini eror')
            return res.status(500).json({message: 'Internal Server Error'})
        })
    }
    static update(req,res){
        Product.update({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
        },{
            where:{
                id:req.params.id
            }
        })
        .then(()=>{
            return res.status(200).json({message: 'Update Success'})
        })
        .catch(({errors})=>{
            console.log(errors)
            return res.status(400).json({message: errors[0].message})
        })
    }
    static delete(req,res){
        Product.destroy({where:{id: req.params.id}})
        .then(()=>{
            return res.status(200).json({message: 'Delete Success'})
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).json({message: 'Internal Server Error'})
        })
    }
}

module.exports = ProductController