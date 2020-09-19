const { verifyToken, decryptJwt } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try{
        const { access_token } = req.headers

        if(!access_token){
            throw { message : 'User not Authenticated', statusCode : 401 }
        }

        const payload = decryptJwt(access_token)

        const user = await User.findOne({
            where : {
                id : payload.id,
                email : payload.email
            }
        })

        if(!user){
            throw { message : 'Invalid JWT!', statusCode : 401 }
        }

        req.userData = user

        next()
    } catch (e) {
        next(e)
    }
}

const authorization = (req, res, next) => {
    try {
        if(req.userData.role === 'admin'){
            next()
        } else {
            throw { message : 'Forbidden', statusCode : 403 }
        }
    } catch (err){
        next(err)
    }
}


module.exports = { authentication, authorization }
