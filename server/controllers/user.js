const { isValid } = require('../helpers/bcrpyt')
const { generateToken } = require('../helpers/jwt')
const {User, Role} = require('../models')

class UserController {
    static async register (req, res, next) {
        try {
            const user = {
                email: req.body.email,
                password: req.body.password
            }

            const newUser = await User.create(user)

            return res.status(201).json({
                id: newUser.id,
                email: newUser.email
            })
        } catch (err) {
            return next(err)
        }
    }

    static async login (req, res, next) {
        try {
            const {email, password} = req.body

            if (!email || !password) {
                throw {message: 'Email/password cannot be empty', status: 400}
            }

            const user = await User.findOne({
                where: {
                    email
                },
                include: [
                    {
                        model: Role,
                        attributes: ['name']
                    }
                ]
            })

            if (!user || !isValid(password, user.password)) {
                throw {message: 'Wrong email/password', status: 400}
            }

            const access_token = generateToken({
                id: user.id,
                email: user.email,
                role: user.Role.name
            })

            return res.status(200).json({
                id: user.id,
                email: user.email,
                role: user.Role.name,
                access_token
            })
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = {
    UserController
}