const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = (req, res, next) => {
    const { access_token } = req.headers
    let userData = verifyToken(access_token);
    const { email } = userData;
    User.findOne({
        where: {
            email
        }
    }).then(user => {
        if (user) {
            req.userData = userData;
            next();
        } else {
            throw { message: 'User is not authenticated', statusCode: 401 }
        }
    }).catch(err => {
        next(err)
    })
}

const authorization = (req, res, next) => {

}


module.exports = { authentication }