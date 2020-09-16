const bcrypt = require('bcryptjs')

function createHash (password) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function validate (password, hash) {
    return bcrypt.compareSync(password,hash)
}

module.exports = { createHash, validate }