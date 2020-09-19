const { response } = require('express');
const jwt = require('jsonwebtoken');
const secret = process.env.USER_SECRET
function generateUserToken(userData){
    let access_token
    if (userData.role === "admin"){
        const {id, email, role} = userData
        return access_token = jwt.sign({id, email, role}, secret)
    }
    else {
        const {id, email, name, address, phone, role} = userData
        return access_token = jwt.sign({id, email, name, address, phone, role}, secret)
    }
    
}

function verifyToken(token){
    // console.log(secret, "from helpers");
    return jwt.verify(token, secret)
}

module.exports = {generateUserToken, verifyToken}