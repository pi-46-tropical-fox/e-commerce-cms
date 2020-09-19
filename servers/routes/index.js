const routes = require(`express`).Router()
const userRts = require(`./userRts`)
const productRts = require(`./productRts`)
const bannerRts = require(`./bannerRts`)

routes.use(`/`, userRts)
routes.use(`/`, productRts)
routes.use(`/`, bannerRts)

module.exports = routes