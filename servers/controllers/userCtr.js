const {User} = require(`../models`)
const {compare} = require(`../helpers/bcrypt`)
const {encode} = require(`../helpers/jwt`)

class Controller{
    static async login(req, res, next){
        const {email, password} = req.body
        const errorMsg = {message: "Invalid Email or Password", statusCode: 403}
        try {
            const user = await User.findOne({where: {email}})
            if(!user){
                throw errorMsg
            }
            const isValid = compare(password, user.password)    
            if(isValid) {
                const token = encode(user.email, user.id, user.role)
                return res.status(200).json({
                    message: "Successfully login",
                    data: {
                        email: user.email
                    },
                    access_token: token
                })
            } else {
                throw errorMsg
            }
        } catch(err) {
            return next(err)
        }
    }
}

module.exports = Controller