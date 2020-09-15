const { User } = require('../models')

const authorization = (req, res, next) => {
    User.findByPk(req.userData.id)
    .then(user=>{
        if(user.role === 'admin'){
            next()
        }
        else{
            return res.status(403).json({message: 'User Is Not Authorized'})
        }
    })
    .catch(err =>{
        return res.status(500).json({message: 'internal server error'})
    })
}

module.exports = authorization