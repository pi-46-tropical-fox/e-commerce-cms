const jwt = require('jsonwebtoken')
secret = process.env.SECRET

const generateToken = data => {
    const access_token = jwt.sign({id: data.id, email: data.email, role: data.role}, secret)
    return access_token
}

const verifyToken = token => {
    const verify = jwt.verify(token, secret)
    return verify
}

module.exports = { generateToken, verifyToken } 