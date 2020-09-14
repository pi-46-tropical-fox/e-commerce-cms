const {User} = require('../models')
const jwt = require('jsonwebtoken')

class UserController {
    static register(req,res) {
        
        var userObj = {
            email: req.body.email,
            password: req.body.password
        }
        
        User.create(userObj)
        .then(user => {
            res.status(201).json({email: user.email, message: 'Has been successfully registered'})
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({message: err.message})
        })
    }

    static login(req,res) {
        var userObj = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where: {email: req.body.email}})
        .then(user => {
            const access_token = jwt.sign({id:user.id, email: user.email}, 'rahasiakuuu')
            res.status(200).json({access_token,email: user.email})
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({message: err.message})
        })
    }

}

module.exports = UserController