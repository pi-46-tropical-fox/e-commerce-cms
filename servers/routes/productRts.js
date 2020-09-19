const routes = require(`express`).Router()
const {productCtr} = require(`../controllers`)
const {authentication, authorization, isAdmin} = require(`../middlewares/auth`)

routes.post(`/products`, authentication, isAdmin, productCtr.add)
routes.get(`/products`, authentication, isAdmin, productCtr.getAllProducts)
routes.get(`/products/:id`, authentication, isAdmin, productCtr.findOne)
routes.put(`/products/:id`, authentication, isAdmin, authorization, productCtr.update)
routes.delete(`/products/:id`, authentication, isAdmin, authorization, productCtr.delete)

module.exports = routes