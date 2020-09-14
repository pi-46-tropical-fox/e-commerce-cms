const { User } = require("../models");
const { generate } = require("../helper/jwt");
const { compare } = require("../helper/bcrypt");

class Controller {
  static login(req, res, next) {
    let params = {
      email: req.body.email,
      password: req.body.password,
    };
    User.findOne({ where: { email: req.body.email } })
      .then((data) => {
        if (data) {
          const isValid = compare(req.body.password, data.password);
          if (isValid) {
            const access_token = generate(data);
            return res.status(200).json({ access_token });
          }else{
            return res.status(400).json({message:`invalid email / password`})
          }
        } else {
            return res.status(400).json({message:`invalid email / password`})
        }
      })
      .catch((err) => {
        return res.status(500).json(err)
      });
  }
}

module.exports = Controller;
