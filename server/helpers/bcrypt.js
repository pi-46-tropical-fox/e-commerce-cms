const bcrypt = require('bcryptjs')

function generatePassword(password) {
    return bcrypt.hashSync(password, 10)
}
function comparePassword(plainPassword, hash) {
    return  bcrypt.compareSync(plainPassword, hash)
}

module.exports = { generatePassword, comparePassword }