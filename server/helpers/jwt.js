const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

function signJwt(data) {
    const {id, email} = data
    return jwt.sign({id,email}, 'secret')
}

function verifyJwt(token) {
    return jwt.verify(token, 'secret')
}

module.exports = {
    signJwt, verifyJwt
};
