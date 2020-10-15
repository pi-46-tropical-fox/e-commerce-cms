const {verifyJwt} = require('../helpers/jwt');
const {Product,User} = require('../models');

const authentication = async (req,res,next) => {
    const {access_token} = req.headers
    try {
        const userData = verifyJwt(access_token)

        let user = await User.findOne({
            where: {
                email:userData.email
            }
        })
        if(user) {
            req.userData = userData
            next()
        } else {
            throw {message: 'User not autenticated', statusCode: 401}
        }
    } catch (err) {
        return next(err)
    }
}

const authorization = async (req,res,next) => {
    
    const {access_token} = req.headers

    try {
        const userData = verifyJwt(access_token)
        let user = await User.findOne({where: {email:userData.email}})
        if(user.role == 'admin') {
            req.userData = userData
            next()
        } else {
            throw {message: 'not authorized', statusCode:401}
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authentication, authorization
};
