const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function generateToken (payload) {
    return jwt.sign(payload, secret)
}

function decode ( access_token ) {
    return jwt.verify(access_token, secret)
}

module.exports = { generateToken, decode }