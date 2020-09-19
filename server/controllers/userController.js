const { User } = require("../models");
const { createHash, compareHash } = require("../helpers/bcrypt");
const { generateToken, verifyToken } = require("../helpers/jwt");

class Controller {
  static login(req, res, next) {
    let { email, password } = req.body;
    User.findOne({ where: {email}})
      .then((data) => {
        if (!data) {
          // console.log(data, 'if 1')
          throw { message: "invalid email or password", statusCode: 400 };
          // return res.status(400).json({ message: "invalid email or password"});
        } else {
          if (compareHash(password, data.password)) {
            const user = {
              email: email,
              id: data.id,
              role: data.role,
            };
            const access_token = generateToken(user);
            // console.log(access_token, "ini token");
            return res.status(201).json({ access_token, email});
          } else {
            // console.log(data, 'else 1')
            // return res.status(400).json({message:'invalid email or password'})
            throw { message: "invalid email or password", statusCode: 400 };
          }
        }
      })
      .catch((err) => {
        console.log(err)
        // return res.status(500).json({message:'error'});
        return next(err)
      });
  }
}

module.exports = Controller;
