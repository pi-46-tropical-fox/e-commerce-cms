const { User } = require("../models");
const { generate } = require("../helper/jwt");
const { compare } = require("../helper/bcrypt");

class Controller {
  static login(req, res, next) {
    User.findOne({ where: { email: req.body.email } })
      .then(data => {
        if (data) {
          const isValid = compare(req.body.password, data.password);
          if (isValid) {
            const access_token = generate(data);
            return res.status(200).json({ access_token });
          }else{
            throw ({message:`invalid email / password` , statusCode:400})
          }
        } else {
            throw ({message:`invalid email / password` , statusCode:400})
        }
      })
      .catch((err) => {
        next(err)
      });
  }
}

module.exports = Controller;
