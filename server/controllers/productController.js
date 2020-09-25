const { Product, Category } = require("../models")

class ProductController {
	static async addProduct(req, res, next) {
		try {
			// let userData = req.userData
			let { name, image_url, price, stock, CategoryId } = req.body

			if(!name || !price || !stock || !image_url){
				let errors = {
					statusCode : 400,
					message : "Field(s) can't be null"
				}
				next(errors)
			}else{
				console.log("still work");
				let createdProduct = await Product.create({ name, image_url, price, stock, CategoryId })
				return res.status(201).json(createdProduct)
			}
			

		} catch (err) {
			next(err)
		}
	}

	static async getAllProducts(req, res, next) {
		try {
			let productsData = await Product.findAll()
			return res.status(200).json(productsData)
		} catch (err) {
			next(err)
		}
	}

	static async editProduct(req, res, next){
		try{
			const id = req.params.id
			let { name, image_url, price, stock, CategoryId } = req.body

			let editedProduct = await Product.update({ name, image_url, price, stock, CategoryId }, {where: {id}})
			// console.log(editedProduct);
			return res.status(200).json(editedProduct)
		}catch(err){
			next(err)
		}
	}

	static async deleteProduct(req,res,next){
		try{
			const id = req.params.id

			let deletedProduct= await Product.destroy({where: {id}})
			return res.status(200).json(deletedProduct)
		}catch(err){
			next(err)
		}
	}
}

module.exports = ProductController