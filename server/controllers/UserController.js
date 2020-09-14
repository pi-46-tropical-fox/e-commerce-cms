const {User} = require ("../models")


class UserController {
    static register (req, res) {
        let params = {
            email: req.body.email,
            password: req.body.password
        }

        User.create (params)

        .then (data => {
            res.status (201).json ({email:data.email, message: "Data has been saved"})
        })

        .catch (err => {
            console.log (err)
        })
    }

}

module.exports = UserController