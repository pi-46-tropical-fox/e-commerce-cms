const jwt = require('jsonwebtoken');

function signJwt(data) {
    const {id, email} = data
    return jwt.sign({id,email}, 'jwt')
}

function verifyJwt(token) {
    return jwt.verify(token, 'jwt')
}

module.exports = {
    signJwt, verifyJwt
};
