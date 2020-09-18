const { User } = require('../models')
const AuthController = require('./AuthController')

class UserController{
    static async register(req, res, next){
        try {
            let signedViaSocial = false
            var { name, email, picture, password } = ''
            let input = { name, email, picture, password }

            if(req.app.locals.body) {
                signedViaSocial = true
                Object.keys(req.app.locals.body).forEach(key => input[key] = req.app.locals.body[key])
            } else {
                Object.keys(req.body).forEach(key => input[key] = req.body[key])
                input.RoleId = 2
                picture = ''
            }

            await User.create(input)

            if(signedViaSocial){
                let { name, email, picture } = input

                req.app.locals.code = 201
                req.app.locals.payload = { name, email, picture }

                return AuthController.sign(req, res, next)
            }

            res.status(201).json({ message: "Successfully registered. Yeay!" })
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = UserController