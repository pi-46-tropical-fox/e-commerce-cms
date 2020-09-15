const { verifyToken } = require('../helpers/jwt')
const { Product, User } = require('../models')

const authentication = async (req, res, next) => {
    // console.log(req.headers, 'ini req.headers')
    const { access_token } = req.headers

    try {
        const userData = verifyToken(access_token)
        // req.useruserData = userData
        let user = await User.findOne({ where: { email: userData.email } })
        if (user) {
            req.userData = userData
            next()
        } else {
            throw { message: 'User authentication failed' }
        }
    } catch (err) {
        // res.status(401).json({ message: 'User authentication failed' })
        console.log(err, 'ini error authentication')
        next(err)
    }

}

const authorization = async (req, res, next) => {
    const { access_token } = req.headers
    try {
        const userData = verifyToken(access_token)
        let user = await User.findOne({ where: { email: userData.email } })
        if (user.role == 'admin') {
            req.userData = userData
            next()
        } else {
            throw { message: `you don't have access for this feature`, statusCode: 401 }
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = { authentication, authorization }