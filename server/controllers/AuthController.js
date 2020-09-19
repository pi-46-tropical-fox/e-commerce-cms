const { User } = require('../models')
const { check } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const { generateRandomStrings } = require('../helpers/randomizer')
const { makeToken } = require('../helpers/jwt')

class AuthController {
    static async login(req, res, next) {
        try {
            let { email, password } = req.body

            let user = await User.findOne({ where: { email } })

            if (user && check(password, user.password)) {
                    let { name, email, picture } = user
                    req.app.locals.code = 200
                    req.app.locals.payload = { name, email, picture }

                    return AuthController.sign(req, res, next)
            } else {
                throw { code: 401, message: "Oops! Seems like you've entered wrong credentials." }
            }
        } catch (e) {
            return next(e)
        }
    }

    static async socialLogin(req, res, next) {
        try {
            let code = 200
            const client = new OAuth2Client(process.env.G_CLIENT_ID)
            const { g_access_token } = req.headers

            const ticket = await client.verifyIdToken({
                idToken: g_access_token,
                audience: process.env.G_CLIENT_ID
            })

            const { name, email, picture } = ticket.getPayload()

            let user = await User.findOne({ where: { email } })

            if (!user) {
                code = 307
                req.app.locals.body = { name, email, picture, password: generateRandomStrings(25, false) }

                res.redirect(code, '/users/register')
            }

            req.app.locals.payload = { name, email, picture }
            req.app.locals.code = code

            return AuthController.sign(req, res, next)
        } catch (e) {
            return next(e)
        }
    }

    static async sign(req, res, next) {
        try {
            let { name, email, picture } = req.app.locals.payload
            let code = req.app.locals.code

            let access_token = makeToken(req.app.locals.payload)

            res.status(code).json({ access_token, name, email, picture })
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = AuthController