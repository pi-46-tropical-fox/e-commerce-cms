const { User } = require('../models')
const { generateToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt')

class UserController {
    static async register(req, res) {
        try {
            const { email, password } = req.body
            await User.create({email, password})
            return res.status(201).json({email})
        }
        catch(err) {
            console.log(err, '<<<< Error di Register');
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return res.status(400).json({message: "Invalid Email Address"})
            }
            const isValid = comparePassword(password, user.password)
            if (!isValid) {
                return res.status(400).json({message: "Invalid Password"})
            }
            const access_token = generateToken({email: user.email, id: user.id, role: user.role})
            return res.status(200).json({access_token})
        }
        catch(err) {
            console.log(err, '<<<< Error di Login');
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}

module.exports = UserController