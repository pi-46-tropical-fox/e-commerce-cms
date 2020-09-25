const { Category, Product } = require('../models')

class CategoryController {
  static async getCategories(req, res, next){
    try{
      let categoriesData = await Category.findAll({include: Product})
      res.status(200).json(categoriesData)
    }catch(err){
      next()
    }
  }

  static async createCategory(req, res, next){
    try{
      let {name} = req.body
      
      let categoryData = await Category.create({name})
      
      res.status(201).json({id: categoryData.id, name: categoryData.name})
    } catch (err){
      next(err)
    }
  }

  static async deleteCategory(req, res, next){
    try{
      let id = req.params.id

      let deletedProduct = await Category.destroy({where: {id}})
      
      res.status(200).json(deletedProduct)
    }catch(err){
      next(err)
    }
  }
}

module.exports = CategoryController