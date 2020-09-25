const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const makeToken = payload => jwt.sign(payload, secret)

const validate = token => jwt.verify(token, secret)

module.exports = {
    makeToken, validate
}