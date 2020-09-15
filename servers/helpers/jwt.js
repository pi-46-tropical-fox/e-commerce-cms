const jwt = require(`jsonwebtoken`)

module.exports = {
    encode: (email, id, role) => {
        return jwt.sign({email, id, role}, process.env.JWT_SECRET)
    },

    verify_token: (token) => {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}