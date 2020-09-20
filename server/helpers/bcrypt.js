const bcrypt = require('bcryptjs')

const hash = (inputPass) => {
    let salt = bcrypt.genSaltSync(10);
    let hashed = bcrypt.hashSync(inputPass, salt);
    return hashed
}

const compare = (inputPass, passfromDB) => {
    return bcrypt.compareSync(inputPass, passfromDB)
}

module.exports = { hash, compare }