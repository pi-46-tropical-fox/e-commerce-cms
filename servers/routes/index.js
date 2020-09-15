const routes = require(`express`).Router()
const userRts = require(`./userRts`)
const productRts = require(`./productRts`)

routes.use(`/`, userRts)
routes.use(`/`, productRts)

module.exports = routes