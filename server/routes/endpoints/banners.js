const bannerEndpoints = require('express').Router()
const { authenticate, authorize } = require('../../middleware/auth')
const { BannerController } = require('../../controllers')

bannerEndpoints
.get('/', BannerController.read)
.get('/:id', BannerController.readOne)
.post('/', authenticate, authorize, BannerController.create)
.put('/:id', authenticate, authorize, BannerController.update)
.delete('/:id', authenticate, authorize, BannerController.delete)

module.exports = bannerEndpoints