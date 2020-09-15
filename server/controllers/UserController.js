const { comparer } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {User} = require('../models')

class UserController{
    static login (req, res, next) {
        User.findOne({where:{email: req.body.email}})
        .then(user =>{
            let valid = comparer(req.body.password, user.password)
            if(valid){
                let access_token = generateToken(user)
                res.status(200).json({access_token, email: data.email})
            }
            else{
                res.status(400).json({message: 'Invalid Username or Password'})
            }
        })
        .catch(err =>{
            res.status(400).json({message: 'Invalid Username or Password'})
        })
    }

}

module.exports = UserController