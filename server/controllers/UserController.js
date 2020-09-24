const {User} = require('../models')
const comparePassword = require('../helpers/comparePass')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static login(req, res, next) {
        let option = {
            where: {
                email: req.body.email
            }
        }

        User.findOne(option)
        .then(user => {
            if (user) {
                let valid = comparePassword(req.body.password, user.password)
                if (valid) {
                    const access_token = generateToken(user)
                    return res.status(200).json({name: user.name, email: user.email, access_token})
                } else {
                    return res.status(400).json({message: 'Invalid email or password'})
                }
            } else {
                return res.status(404).json({message: 'Email doesnt exists'})
            }
        })
        .catch(err => {
            return res.status(500).json({message: 'Internal server error'})
        })
    }
}

module.exports = UserController