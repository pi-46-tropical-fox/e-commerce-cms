const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
require('dotenv').config()

function authentication(req, res, next) {
  try {
    const token = req.headers.access_token;
    if (token) {
      jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
        if (err) {
          throw {
            status: 401,
            message: 'Invalid token'
          }
        } else {
          Admin.findOne({ where: { email: decoded.UserEmail } })
            .then(admin => {
              if (admin) {
                req.user = decoded
                next()
              } else {
                throw {
                  status: 404,
                  message: 'User not found'
                }
              }
            })
        }
      })
    } else {
      throw {
        status: 404,
        message: 'Token not found'
      }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authentication