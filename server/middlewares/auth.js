const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');
const authentication = async (req, res, next) => {
  const { access_token } = req.headers
  try {
    if (!access_token) {
      throw {statusCode: 400, message: 'user not authenticated'}
    }
    const userData = verifyToken(access_token)
    let user = await User.findOne({
      where: {
        email: userData.email
      }
    })
    if (user) {
      req.userData = user
      next()
    } else {
      throw {statusCode: 400, message: 'user not authenticated'}
    }
  } catch (err) {
    let { statusCode, message } = err;
    if (!statusCode) {
      statusCode = 500;
    } 
    return res.status(statusCode).json({err, message})
  }
}
const authorization = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userData.id)
    // console.log(user, 'user.role');
    if(user && user.role === 'admin') {
      next()
    } else {
      return res.status(403).json({message: 'forbidden access'})
    }
  } catch(err) {
    return res.status(403).send(err)
  }
}
module.exports = { authentication, authorization }