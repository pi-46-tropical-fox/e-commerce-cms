'use strict'

const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
// const secret = '12345'

const generateToken = (user) => {
  const access_token = jwt.sign({
    id : user.id, email : user.email, name : user.name, role : user.role
  }, secret)
  // console.log('GENERATETOKEN');
  // console.log(access_token);
  return access_token
}

const verifyToken = (token) => {
  // console.log('VERIFY');
  // console.log(token);
  return jwt.verify(token, secret)
}


module.exports = {
  generateToken,
  verifyToken
}