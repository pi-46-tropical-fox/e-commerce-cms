const routes = require(`express`).Router()
const {userCtr} = require(`../controllers`)

routes.post(`/login`, userCtr.login)

module.exports = routes