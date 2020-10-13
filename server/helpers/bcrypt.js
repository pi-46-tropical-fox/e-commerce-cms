const bcrypt = require ("bcryptjs")

const valid = (password, hashPassword) => {
    let result = bcrypt.compareSync (password, hashPassword)
    return result
}

const hash = (password) => {
    const salt = bcrypt.genSaltSync (10)
    const hash = bcrypt.hashSync (password, salt)
    
    return hash
}

module.exports = {valid, hash}
