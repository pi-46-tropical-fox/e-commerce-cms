const bcrypt = require('bcryptjs')

const hashPass = (password) => {
    let hash = bcrypt.hashSync(password, 8);

    return hash
}

const checkHash = (password, oldPass) => {
    let decrypted = bcrypt.compareSync(password, oldPass)

    return decrypted
}

module.exports = { hashPass, checkHash }