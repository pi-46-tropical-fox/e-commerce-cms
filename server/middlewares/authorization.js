const {User} = require('../models')

function authorization(req, res, next){
    console.log(req.user.id);
    User.findByPk(req.user.id)
    .then(data => {
        if(data.role == 'admin'){
            next()
        }else{
            return ({message: "Error"})
        }
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = authorization