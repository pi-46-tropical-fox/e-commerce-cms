'use strict'

const { Product } = require('../models')

class ProductController {
  static async getProduct (req, res, next) {
    const showProducts = await Product.findAll()
    try {
      return res.status(200).json(showProducts)
    } catch (err) {
      return res.status(404).json( { message : `Product does not exist!`})
    }
    
  }

  static async createProduct (req, res, next) {
    const { name, image_url, price, stock } = req.body
    try {
      // console.log('IN');
      const newProduct = await Product.create({ name, image_url, price, stock })
      // console.log(newProduct);
      if (!newProduct) {
        throw { message : msg }
      } else { 
        return res.status(201).json(newProduct)
      }
    } catch (err) {
      next (err)
    }
  
  }

  static async showOneProduct (req, res, next) {
    try {
      const showProductById = await Product.findByPk(+req.params.product_id)
      console.log('HIT <<<<<<, CONTROLLER');
      if (!showProductById) {
        res.status(404).json({ message : `Product does not exist!`})
      } else {
        return res.status(200).json(showProductById)
      }
    } catch (err) {
      next (err)
    }
  }

  static async deleteProduct (req, res, next) {
    // console.log('HIT');
    try {
      const removeProduct = await Product.destroy ({ where : { id : +req.params.product_id } })
      
      if (!removeProduct) {
        throw { message : `Product does not exist!`, statusCode : 404 }
      } else {
        return res.status(200).json('Product has been successfully removed!')
      }
    } catch (err) {
      next (err)
    }
  }

  static async updateProduct (req, res, next) {
    const { name, image_url, price, stock } = req.body
    const id = +req.params.product_id

    try {
      const updateProduct = await Product.update( 
        { name, image_url, price, stock },
        { where : { id } }
      )
      if (!updateProduct || !updateProduct[0]) {
        throw { message : `Product not exist!`, statusCode : 404 }
      } else {
        const showUpdatedProduct = await Product.findByPk(id)
        return res.status(200).json(showUpdatedProduct)
      }
    } catch (err) {
      next (err)
    }
    
  }

  
  
}


module.exports = ProductController