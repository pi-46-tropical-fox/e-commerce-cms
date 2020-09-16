const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt');
const {signJwt} = require('../helpers/jwt');

class UserController {

    static async register(req,res,next) {
        
        let {email,password,role} = req.body
        try {
            const user = await User.create({
                email,password,role
            })
            res.status(201).json({
                message: 'user success to register',
                id: user.id,
                email: user.email
            })
        } catch (err) {
            next(err)
        }
        
    }

    static async login (req,res,next) {
        const {email,password} = req.body

        try {
            const data = await User.findOne({where:{email}})
            if(!data) {
                // throw ({message: 'Username/password wrong',statusCode:400})
                return res.status(400).json({message: 'Username/password wrong'})
            } else {
                const isValid = comparePassword(password,data.password)
                if(isValid) {
                    let access_token = signJwt(data)
                    res.status(200).json({access_token,email:data.email})
                } else {
                    return res.status(400).json({message: 'Username/password wrong'})
                    // throw ({message: 'Username/password wrong', statusCode:400})
                }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController