const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    const token = jwt.sign(data, process.env.SECRET);

    return token
}

const decodeToken = (token) => {
    const decoded = jwt.verify(token, process.env.SECRET);

    return decoded
}

module.exports = { generateToken, decodeToken }