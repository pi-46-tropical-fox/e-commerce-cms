const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const generateToken = (payload) => {
    const access_token = jwt.sign(payload, secret)
    return access_token
}

const verifyToken = (token) => {
    return jwt.verify(token, secret)
    
}

module.exports = {
    generateToken,
    verifyToken
}