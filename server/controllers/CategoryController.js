const {Category, Product} = require('../models')

class CategoryController {
    static async showAllCategory(req, res, next){
        try {
            const categories = await Category.findAll()
            return res.status(200).json(categories)
        } catch (err) {
            return next(err)
        }
    }
    // static async showCategoryById(req, res, next){
    //     try {
    //         const category = await Category.findOne({
    //             include: [{
    //                 model: Product,
    //                 attributes: ['id','name', 'img_url', 'color', 'capacity', 'price', 'stock']
    //             }],
    //             where: {
    //                 id: +req.params.id
    //             }
    //         })
    //         return res.status(200).json(category)
    //     } catch (err) {
    //         return next(err)
    //     }
    // }
}
module.exports = CategoryController