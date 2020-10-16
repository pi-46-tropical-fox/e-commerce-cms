'use strict'

const { Banner } = require('../models')

class BannerController {
  static async getBanner (req, res, next) {
    const showBanners = await Banner.findAll()
    try {
      return res.status(200).json(showBanners)
    } catch (err) {
      return res.status(404).json( { message : `Banner does not exist!`})
    }
    
  }

  static async createBanner (req, res, next) {
    const { title, image_url, status } = req.body
    try {
      // console.log('IN');
      const newBanner = await Banner.create({ title, image_url, status })
      // console.log(newBanner);
      if (!newBanner) {
        throw { message : msg }
      } else { 
        return res.status(201).json(newBanner)
      }
    } catch (err) {
      next (err)
    }
  
  }

  static async showOneBanner (req, res, next) {
    try {
      const showBannerById = await Banner.findByPk(+req.params.banner_id)
      console.log('HIT <<<<<<, CONTROLLER');
      if (!showBannerById) {
        res.status(404).json({ message : `Banner does not exist!`})
      } else {
        return res.status(200).json(showBannerById)
      }
    } catch (err) {
      next (err)
    }
  }

  static async deleteBanner (req, res, next) {
    // console.log('HIT');
    try {
      const removeBanner = await Banner.destroy ({ where : { id : +req.params.banner_id } })
      
      if (!removeBanner) {
        throw { message : `Banner does not exist!`, statusCode : 404 }
      } else {
        return res.status(200).json('Banner has been successfully removed!')
      }
    } catch (err) {
      next (err)
    }
  }

  static async updateBanner (req, res, next) {
    const { title, image_url, status } = req.body
    const id = +req.params.banner_id

    try {
      const updateBanner = await Banner.update( 
        { title, image_url, status },
        { where : { id } }
      )
      if (!updateBanner || !updateBanner[0]) {
        throw { message : `Banner not exist!`, statusCode : 404 }
      } else {
        const showUpdatedBanner = await Banner.findByPk(id)
        return res.status(200).json(showUpdatedBanner)
      }
    } catch (err) {
      next (err)
    }
    
  }

  
  
}


module.exports = BannerController