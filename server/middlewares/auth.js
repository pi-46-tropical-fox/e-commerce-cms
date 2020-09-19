const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async function (req, res, next) {
    const { access_token } = req.headers
    try {
        const userData = verifyToken(access_token)
        let user = await User.findOne({where: {email: userData.email}})
        if (user) {
            req.userData = userData
            next()
        } else {
            return res.status(401).json({message: 'User not authenticated'})
        }
    }
    catch(err) {
        console.log(err, '<<< ini error authentication')
        return res.status(500).json({message: 'Internal Server Error'})
    }
}
const authorization = async function(req, res, next) {
    try {
        const {access_token} = req.headers
        const userData = verifyToken(access_token)
        if(userData.role == 'admin') {
            next()
        } else {
            return res.status(401).json({message: 'User not authenticated'})
        }
    }
    catch(err) {
        console.log(err, '<<< ini error authorization')
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = { authentication, authorization }