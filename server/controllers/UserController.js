const {User} = require('../models')
const {generateToken} = require('../helpers/jwt')
const compare = require('../helpers/bcrypt')

class UserController {
    static register(req,res) {
        const params = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        User.create(params)
        .then(result => {
            res.status(201).json({email:result.email, id:result.id, role: result.role, msg: 'registration successful'})
        })
        .catch(err => {
            console.log(err);
        })
    }
    static login(req,res) {
        let {email,password} = req.body
        User.findOne({where:{email}})
        .then(result => {
            if (!result) return res.status(401).json({msg: 'Invalid email/password'})
            else return result
        })
        .then(result => {
            // console.log(result);
            const validation = compare(password, result.password)
            if (validation) {
                let payload = {
                    id: result.id,
                    email: result.email
                }
                let access_token = generateToken(payload)
                return res.status(200).json({
                    access_token: access_token,
                    id: result.id,
                    email: result.email
                })
            } else {
                return res.status(400).json({msg:'Internal server error'})
            }
        })
        .catch(err => {
            console.log(err);
            // return res.status(500).json({msg: 'Internal server error'})
        })
    }
}

module.exports = UserController