const { verifyToken } = require("../helpers/jwt");
const {User} = require("../models");


function authentication(req,res,next){
    try{
        // console.log(req.headers)
        const userData = verifyToken(req.headers.access_token)
        // console.log(userData)
        User.findByPk(userData.id)
        .then(user=>{
            if(user){
                req.userData = userData
                next()
                // console.log(req.userData)
            }else{
                res.status(403).json({message: 'User Is Not Authenticate'})
            }   
        })
        .catch(err=>{
            console.log(err)
            res.status(403).json({message: 'User Is Not Authenticate'})
        })
    }catch(err){
        res.status(403).json({message: 'User Is Not Authenticate'})
        console.log(`${err.name}: ${err.message} <<< eror jwt`) // name: JsonWebTokenError
    }
}
function authorization(req,res,next){
    User.findByPk(req.userData.id)
    .then(user=>{
        // console.log(user, ' <<<<< user auth')
        if(user.role === 'admin'){
            next()
        }else{
            return res.status(403).json({message: 'User Is Not Authorize'})
        }
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({message: 'internal server error'})
    })
}

module.exports = {authentication, authorization}