const bcrypt = require('bcryptjs')

function hashPassword(passwordString){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(passwordString, salt)
}

function verifyPassword(passwordString, hash){
    return bcrypt.compareSync(passwordString, hash)
}

module.exports = { hashPassword, verifyPassword }
