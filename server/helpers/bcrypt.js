const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync()

const hash = password => bcrypt.hashSync(password, salt)

const check = (password, hash) => bcrypt.compareSync(password, hash)

module.exports = {
    hash, check
}