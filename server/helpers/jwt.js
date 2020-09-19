const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia'

function signPayload(payload){
    return jwt.sign(payload, JWT_SECRET)
}

function decryptJwt(token){
    return jwt.verify(token, JWT_SECRET)
}

module.exports = { signPayload, decryptJwt }
