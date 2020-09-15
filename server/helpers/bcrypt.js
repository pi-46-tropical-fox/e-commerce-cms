const bcrypt = require('bcryptjs')

const hash = password => {
    let salt = bcrypt.genSaltSync(10);
    let hashed = bcrypt.hashSync(password, salt);
    return hashed
}

const comparer = (password, hashed) => {
    return bcrypt.compareSync(password, hashed)
}

module.exports = { hash, comparer }