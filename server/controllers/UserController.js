const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {User} = require('../models')

class UserController {
    static login(req,res){
        // console.log(req.body)
        User.findOne({where:{email: req.body.email}})
        .then(user=>{
            let valid = checkPassword(req.body.password, user.password)
            if(valid){
                let access_token = generateToken(user)
                res.status(200).json({access_token})
            }else{
                res.status(400).json({message: 'Invalid Username or Password'})
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({message: 'Invalid Username or Password'})
        })
    }
}

module.exports = UserController