const bcrypt = require(`bcryptjs`)

module.exports = {
    hashing: (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    },

    compare: (pwd1, pwd2) => {
        return bcrypt.compareSync(pwd1, pwd2)
    }
}