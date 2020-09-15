const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const generateToken = (user) => {
    const access_token = jwt.sign({name: user.name, email: user.email, id: user.id}, secret)

    return access_token
}

const verifyToken = (token) => {
    const verified = jwt.verify(token, secret)

    return verified
}


module.exports = { generateToken, verifyToken }