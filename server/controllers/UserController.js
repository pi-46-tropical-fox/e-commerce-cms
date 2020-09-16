const {User} = require ("../models")

const {generateToken} = require ("../helpers/jwt.js")
const {valid} = require ("../helpers/bcrypt.js")


class UserController {
    static registerUsers (req, res) {
        let params = {
            email: req.body.email,
            password: req.body.password,
            role: "customer"
        }

        User.create (params)

        .then (data => {
            res.status (201).json ({email:data.email, message: "Data has been saved"})
        })

        .catch (err => {
            console.log (err)
            // return res.status (400).json (err)
        })
    }

    static loginUsers (req, res) {
        let params = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne ({
            where: {email: params.email}
        })

        .then (data => {
            if (!data) {
                return res.status (400).json ({message: "Invalid Email or Password"})
            }
            return data
        })

        .then (data => {
            const validPassword = valid (params.password, data.password)

            if (validPassword) {
                let payload = {id: data.id, email: data.email, role: data.role}

                let access_token = generateToken (payload)

                return res.status (200).json ({access_token})

            } else {
                console.log (data)
                return res.status (400).json ({message: "Invalid Email or Password"})
            }
        })

        .catch (err => {
            console.log (err)
            // return res.status (500).json ({message : "Internal Server Error"})
        })
    }

}

module.exports = UserController