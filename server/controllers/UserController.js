const {User} = require('../models');
class UserController {

    static register(req,res,next) {
        let {email,password,role} = req.body
        User.create({email,password, role})
        .then(user => {
            res.status(201).json({
                message: 'user success to register',
                'status-code': 201,
                id: user.id,
                email: user.email
            })
        })
        .catch(err => {
            res.status(500).json({err: 'Internal server error'})
        })
    }
}

module.exports = UserController