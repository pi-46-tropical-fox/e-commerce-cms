const {Banner} = require(`../models`)

class BannerController {

    static read(req, res, next) {
        Banner.findAll({order: [['createdAt', 'ASC']]})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            // console.log(err)
            next(err)
        })
    }

    static add(req, res, next) {
       const newBanner = {
        name: req.body.name, 
        image_url: req.body.image_url,
        description: req.body.description,
        status: req.body.status
      }
        
        console.log(newBanner, `ini datanya`)
        Banner.create(newBanner)
        .then(result => {
            // console.log(`ini result`, result
            res.status(201).json(result)
        })
        .catch(err => {
            console.log(err);
            // console.log(`ini error di create`, err)
            next(err)
        })
    }

    static find(req, res, next) {
        let BannerId = req.params.id
        let error = {
            name: `otherError`,
            statusCode: 404,
            message: `Can't find the data.`
        }

        Banner.findByPk(BannerId)
        .then(result => {
            if(result) {
                // console.log(`ini result`, result)
                res.status(200).json(result)
            } else {
                throw error
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static edit(req, res, next) {
        const editBanner = {
            name: req.body.name, 
            image_url: req.body.image_url,
            description: req.body.description,
            status: req.body.status
          }

        let BannerId = req.params.id

        Banner.update(editBanner, {where: {id: BannerId}, returning: true})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        let BannerId = req.params.id
        let error = {
            name: `otherError`,
            statusCode: 404,
            message: `Can't find the data.`
        }
        let deletedData;
        // console.log(`ini di dalam delete`)
        Banner.findByPk(BannerId)
        .then(result => {
            if(!result) {
                throw error
            } else {
                deletedData = result
                return Banner.destroy({where: {id: BannerId}})
            }
        })
        .then(result => {
            // console.log(`ini result`, result)
            res.status(200).json({message: `Successfully delete banner '${deletedData.name}'!`})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
}

module.exports = BannerController