const { decode } = require('../helpers/jwt')
const { User } = require('../models')

function authentication ( req, res, next ) {
    const payload = decode(req.headers.access_token)
    console.log(payload, req.headers.name, '<<<< ini auth' )
    User.findByPk(payload.id)
        .then( user => {
            if(!user) {
                throw { message: "Invalid email or password", statusCode: 401 }
            }

            if(user && user.email === payload.email) {
                req.userData = payload
                next()
            }
            else {
                throw { message: "Invalid email or password", statusCode: 401 }
            }
        })
        .catch( err => {
            return next(err)
        })
}

function authorization ( req, res, next ) {
    console.log(req.userData)

    User.findByPk(req.userData.id)
        .then(user => {
            if( user && user.role === 'admin') {
                console.log(user.role, "<<<< dr authorizatiorn")
                return next()
            }
            else {
                throw { message: "Forbidden Access", statusCode: 403 }
            }
        })
        .catch( err => {
            return next(err)
        })
}

function authorizationCustomer ( req, res, next ) {
    console.log(req.userData)

    User.findByPk(req.userData.id)
        .then(user => {
            if( user && user.role === 'customer') {
                console.log(user.role, "<<<< dr authorizatiorn")
                return next()
            }
            else {
                throw { message: "Forbidden Access", statusCode: 403 }
            }
        })
        .catch( err => {
            return next(err)
        })
}

module.exports = { authentication, authorization, authorizationCustomer}