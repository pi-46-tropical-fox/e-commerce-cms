const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { validate } = require('../helpers/bcrypt')

class UserController {
    static register (req,res, next) {
        const { name, email, password } = req.body

        User.create({ name, email, password })
            .then( user => {
                const payload = { id: user.id , name: user.name, email: user.email }
                return res.status(201).json({message: "Successfully create new User", id: user.id , name: user.name, email: user.email})
            })
            .catch( err => {
                return next(err)
            })

    }

    static login (req,res,next) {
        const { email, password } = req.body

        User.findOne({where: {email}})
            .then( user => {
                if(!user) {
                    throw { message: "Invalid email or password", statusCode: 401 }
                } else {
                    return user
                }
            })        
            .then( user => {
                if(validate(password, user.password)) {    
                    const payload = { id: user.id, name: user.name, email: user.email , role:user.role}
                    const access_token = generateToken(payload)
                    return res.status(200).json({access_token, id:user.id, email: user.email})
                } else {
                    throw { message: "Invalid email or password", statusCode: 401 }
                }
            })
            .catch( err => {
                return next(err)

            })
    }
}

module.exports = UserController