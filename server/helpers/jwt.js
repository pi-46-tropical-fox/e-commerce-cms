const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function generateToken(data) {
    return jwt.sign(data, secret)
}
function verifyToken() {
    return jwt.verify()
}

module.exports = { generateToken, verifyToken }