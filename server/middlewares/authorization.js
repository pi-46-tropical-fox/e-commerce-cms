const {User} = require('../models')

const authorization = (req,res,next) => {
    // console.log(req.UserData);
    const {id} = req.UserData
    // console.log(id);
    User.findByPk(id)
    .then(result => {
        // console.log(result, 'ini findbypk');
        if (result && result.role === 'admin') {
            next()
        } else {
            return res.status(403).json({msg:'unauthorized access'})
        }
    })
    .catch(err => {
        return res.status(403).json({msg:'unauthorized access'})
    })
}

module.exports = {authorization}
