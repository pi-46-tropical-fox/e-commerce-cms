const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

function generateToken(user) {
    const access_token = jwt.sign({ id: user.id, email:user.email, role:user.role }, secret)
    return access_token
}

function validateToken(access_token) {
    const decoded = jwt.verify(access_token, secret)
    return decoded
}


module.exports = { generateToken, validateToken }