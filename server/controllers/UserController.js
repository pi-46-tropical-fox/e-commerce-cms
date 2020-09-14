const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');

class UserController {

  static register(req, res, next) {
    const { email, password } = req.body;
    User.create({ email, password })
    .then(user => {
      // console.log(user);
      const{ email } = user
      res.status(201).json({ email })
    })
    .catch(err => {
      return res.status(500).json({message: "internal server error"})
    }) 
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      where: { email }
    })
    .then(user => {
      if(!user) {
        return res.status(400).json({message:'invalid email or password'})
      }
      return user;
    })
    .then(user => {
      const isValid = bcrypt.compareSync(password, user.password)
      if(isValid) {
        const access_token = generateToken(user)
        return res.status(200).json({access_token})
      } else {
        return res.status(400).json({message: 'invalid email or password'})
      }
    })
    .catch(err => {
      // return res.status(500).json({message: "internal server error"})
      console.log(err);
    })
  }

}

module.exports = UserController;