const { User } = require('../models')
const { generateToken } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt")

class UserController {

    static register(req, res, next) {
        const params = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        User.create(params)
            .then(user => {
                res.status(201).json({
                    message: 'Register succeeded',
                    id: user.id,
                    email: user.email
                })
            })
            .catch(err => {
                return next(err)

            })
    }


    static login(req, res, next) {
        const { email, password } = req.body
        if (!email && !password) {
            throw { message: 'Each of the following forms must be filled', statusCode: 400 }
        } else {
            User.findOne({ where: { email } })
                .then(user => {
                    if (user) {
                        let verified = compare(password, user.password)
                        if (verified) {
                            const access_token = generateToken(user)
                            res.status(200).json({
                                message: 'Login succeeded',
                                id: user.id,
                                email: user.email,
                                access_token
                            })
                        } else {
                            throw { message: 'Email or Password is invalid', statusCode: 400 }
                        }
                    } else {
                        throw { message: 'Email or Password is invalid', statusCode: 400 }
                    }
                })
                .catch(err => {
                    console.log(err)
                    return next(err)
                })
        }
    }
}


module.exports = UserController