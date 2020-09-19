const { Admin } = require('../models');
const { checkPassword } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

class controllerAdmin {
  static login(req, res, next) {
    Admin.findOne({ where: { email: req.body.email } })
      .then(admin=>{
        if(admin){
          if(checkPassword(req.body.password,admin.password)){
            const token = jwt.sign({
              UserId : admin.id,
              UserEmail : admin.email
            }, process.env.TOKEN_KEY)
            res.status(200).json({
              access_token : token,
              email:admin.email
            })
          }else{
            throw {
              status : 401,
              message: 'Wrong password'
            }
          }
        }else{
          throw {
            status: 404,
            message: 'Email not found'
          }
        }
      })
      .catch(err=>{
        next(err)
      })
  }
}

module.exports = controllerAdmin