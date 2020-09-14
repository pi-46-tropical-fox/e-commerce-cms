const { User } = require("../models");
const { comparePass } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static login(req, res) {
    let options = {
      where: {
        email: req.body.email,
      },
    };
    User.findOne(options)
      .then((data) => {
        if (data) {
          let isValid = comparePass(req.body.password, data.password);
          if (isValid) {
            const access_token = generateToken(data);
            return res.status(200).json({ access_token, email: data.email });
          } else {
            return res
              .status(400)
              .json({ message: "Invalid email or password" });
          }
        } else {
          return res.status(400).json({ message: "Invalid email or password" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ message: "Internal Error Server" });
      });
  }
}

module.exports = UserController;
