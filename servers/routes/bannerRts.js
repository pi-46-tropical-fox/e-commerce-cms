const routes = require(`express`).Router()
const {bannerCtr} = require(`../controllers`)
const {authentication, authorization, isAdmin} = require(`../middlewares/auth`)

routes.post(`/banners`, authentication, isAdmin, bannerCtr.add)
routes.get(`/banners`, authentication, isAdmin, bannerCtr.getAllBanners)
routes.get(`/banners/:id`, authentication, isAdmin, bannerCtr.findOne)
routes.put(`/banners/:id`, authentication, isAdmin, bannerCtr.update)
routes.delete(`/banners/:id`, authentication, isAdmin, bannerCtr.delete)

module.exports = routes