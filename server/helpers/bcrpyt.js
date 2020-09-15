const bcrypt = require('bcryptjs')

const hashing = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const isValid = (password, reference) => {
    return bcrypt.compareSync(password, reference)
}

module.exports = {
    hashing,
    isValid
}