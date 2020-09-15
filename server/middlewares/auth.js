const { verifyToken } = require('../helpers/jwt')
const {User} = require('../models')

const authenticate = async (req, res, next) => {
    try {
        if (!req.headers.access_token) {
            throw {message: 'Access token not provided', status: 401}
        }
        let userData = verifyToken(req.headers.access_token)
        const found = await User.findOne({
            where: {
                email: userData.email
            }
        })

        if (!found) throw {message: 'User not authenticated', status: 401}

        req.userData = userData
        next()
    } catch (err) {
        return next(err)
    }
}

const authorize = async (req, res, next) => {
    try {
        const userData = req.userData

        if (userData.role != 'admin') throw {message: 'User not authorized', status: 403}

        next()
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    authenticate,
    authorize
}