const { Category } = require('../models')

class CategoryController {
    static show (req,res,next) {

        Category.findAll()
            .then( result => {
                return res.status(200).json(result)
            })
            .catch( err => {
                return next(err)
            })
    }
    
    static addCategory (req,res,next) {

        const dataCategory = {
            category : req.body.category
        }
        
        Category.create(dataCategory)
            .then( result => {
                return res.status(201).json(result)
            })
            .catch( err => {
                return next(err)
            })
    }

    static deleteCategory (req,res,next) {
        const id = req.params.id

        Category.destroy({where: {id}})
            .then( result => {
                return res.status(200).json({ message: `Successfully delete data with id ${req.params.id}`})
            })
            .catch( err => {
                return next(err)
            })
    }
}

module.exports = CategoryController