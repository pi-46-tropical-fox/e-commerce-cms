const {User} = require('../models')
const bcryptjs = require('bcryptjs')
const {generateToken} = require('../helpers/jwt')

class UserController {

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({where: {email}})
        .then(user => {
            // console.log(user, 'ini user')
            if(!user) {
                throw ({message: 'invalid email/password', statusCode:400})
                // throw {message: 'invalid email/password', statusCode: 400}
            }
            return user
        })
        .then(user => {
            const isValid = bcryptjs.compareSync(password, user.password)
                if (isValid) {
                    //generate jwt
                    const access_token = generateToken(user)
                    return res.status(200).json({ access_token })
                }
                else {
                    return res.status(400).json({message: 'invalid email/password'})
                    // throw {message:'invalid email/password', statusCode:400 }
                }
        })
        .catch(err => {
            // console.log(err)
             return next(err)
            // return res.status(400).json({message: 'invalid email/password'})
            // throw{message: 'Invalid email/password', statusCode: 400}
        })
    }
}

module.exports = UserController