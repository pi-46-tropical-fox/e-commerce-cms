const { validateToken } = require('../helpers/jwt')
const { User, Product } = require('../models')

function authentication(req, res, next) {
    const { access_token } = req.headers

    const userData = validateToken(access_token)

    User.findOne({
        where: {
            email: userData.email
        }
    })
        .then(user => {
            if(user) {
                req.userData = userData
                next()
            }else {
                throw {message: 'User not authenticated', statusCode: 401}
            }
        })
        .catch(err => {
            console.log(err)
            return next(err)
        })
}


function authorizationRole(req, res, next) {
    const id = req.userData.id

    User.findByPk(id)
        .then(user => {
            if(user && user.role == 'admin') {
                next()
            }else {
                throw {message: 'User not authenticated!', statusCode: 401}
            }
        })
        .catch(err => {
            console.log(err)
            return next(err)
        })
        
}


module.exports = { authentication, authorizationRole }