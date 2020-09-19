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
}

module.exports = CategoryController