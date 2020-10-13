const jwt = require('jsonwebtoken')
const secret = 'secret'

const generateToken = (data) =>{
    const access_token = jwt.sign(data, secret)
    return access_token

}

const verifyToken = (token) =>{
    const verified = jwt.verify(token, secret)
    return verified
}


module.exports = { verifyToken, generateToken }