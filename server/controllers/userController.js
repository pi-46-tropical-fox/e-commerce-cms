const {User} = require("../models")
const bcrypt = require('bcryptjs');
const {generateUserToken} = require("../helpers/userToken")

class UserController {

    static async register(req, res, next){
        try{
            // console.log("masuk");
            const {email, password, name, address, phone, role} = req.body
            // console.log(req.body);
            let userData = await User.create({
                email,
                password,
                name,
                address,
                phone,
                role
            })
            if(userData.role === "admin"){
                res.status(201).json({
                    email,
                    message: "Registration success"
                })
            }
            else{
                // console.log("userData")
                res.status(201).json({
                    email,
                    name,
                    address,
                    phone,
                    message: "Registration success"
                })
            }
        }catch(err){
            next(err)
        }
    }

    static async login(req, res, next){
        console.log("ini login dari userController");
        try{
            const {email, password} =  req.body
            if (!email || !password){
                let errors = {
                    statusCode: 400,
                    message: "Email and password required"
                }
                next(errors)
            }
            let userData = await User.findOne({where: {email}})
            if(!userData){
                let errors = {
                    statusCode : 400,
                    message: "invalid email or password"
                }
                next(errors)
            }else{
                let isValid = bcrypt.compareSync(password, userData.password)
                if(!isValid){
                    let errors = {
                        statusCode : 400,
                        message: "invalid email or password"
                    }
                    next(errors)
                }else{
                    let access_token = generateUserToken(userData)
                    // console.log(access_token)
                    console.log(access_token);
                    res.status(200).json({access_token})
                }
            }
        }catch(err){
            next(err)
        }
    }
}

module.exports = UserController