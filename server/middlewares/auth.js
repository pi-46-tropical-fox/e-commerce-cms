const { User } = require('../models')
const { decodeToken } = require('../helpers/token')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        const dataDecoded = decodeToken(access_token)

        const findUser = await User.findOne({where : { email : dataDecoded.email, id : dataDecoded.id }})

        if(findUser) {
            req.userData = dataDecoded
            next()
        } else {
            throw { message : 'User Not Authenticated', statusCode : 401 }
        }
    } catch(err) {
        next(err)
    }
}

const authorization = async (req, res, next) => {
    try {
        if(req.userData.role == 'admin') {
            next()
        } else {
            throw { message : 'Forbidden', statusCode : 403 }
        }
    } catch(err) {
        next(err)
    }
}

module.exports = { authentication, authorization }