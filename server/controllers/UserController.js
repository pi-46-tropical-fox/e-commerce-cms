const { comparer } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {User} = require('../models')

class UserController{
    static login (req, res, next) {
        let options = {
            where: {
                email: req.body.email,
            },
        };
        User.findOne(options)
        .then((data) => {
            if (data) {
            let isValid = comparer(req.body.password, data.password);
                if (isValid) {
                    const access_token = generateToken(data);
                    return res.status(200).json({ access_token, email: data.email });
                } 
                else {
                    throw { message: "Invalid email or password", statusCode: 400 };
                }
            } 
            else {
                throw { message: "Invalid email or password", statusCode: 400 };
            }
        })
        .catch((err) => {
            return next(err);
        });
    }

}

module.exports = UserController