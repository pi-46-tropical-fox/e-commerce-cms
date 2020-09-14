const bannerEndpoints = require('express').Router()
const { BannerController } = require('../../controllers')

bannerEndpoints
.get('/', BannerController.read)
.get('/:id', BannerController.readOne)
.post('/', BannerController.create)
.put('/:id', BannerController.update)
.delete('/:id', BannerController.delete)

module.exports = bannerEndpoints