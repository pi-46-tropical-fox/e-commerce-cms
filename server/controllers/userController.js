const { User } = require('../models')
const comparePassword = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


class UserController{
    static register(req, res, next) {
        
        let userObj = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'customer'
        }

        User.create(userObj)
            .then(data => { 
                return res.status(201).json({email: data.email, message: 'Has been successfully registered!'})
            })
            .catch(err => {
                console.log(err);
                return next(err)
            })
    }

    static login(req, res, next) {
        console.log(req.body)
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(data => {
                if(!data) {
                    throw {message: 'Invalid name or password', statusCode: 400}
                }

                const flag = comparePassword(req.body.password, data.password)
                console.log(flag)
                if(flag) {
                    const access_token = generateToken(data)
                    return res.status(200).json({access_token, role: data.role, message: 'Success to login!'})
                }else {
                    throw {message: 'Invalid name or password', statusCode: 400}
                }

            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

}

module.exports = UserController