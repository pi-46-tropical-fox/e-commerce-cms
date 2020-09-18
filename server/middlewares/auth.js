const { verifyToken, decryptJwt } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = (req, res, next) => {
    try{
        const { accesss_token } = req.headers

        const payload = decryptJwt(accesss_token)

        const user = User.findOne({
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

}


module.exports = { authentication, authorization }
