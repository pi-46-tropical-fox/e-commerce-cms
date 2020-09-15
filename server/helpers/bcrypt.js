const bcrypt = require ("bcryptjs")

const valid = (password, hashPassword) => {
    let result = bcrypt.compareSync (password, hashPassword)

    return result
}

module.exports = {valid}
