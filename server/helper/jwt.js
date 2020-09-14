const jwt  = require('jsonwebtoken')
const secret = process.env.SECRET

const generate = (data)=>{
    const access_token = jwt.sign({id:data.id,email:data.email,role:data.role},secret)
    return access_token
}

const verify = (token)=>{
    const access_token = jwt.verify(token,secret)
    return access_token
}

module.exports = {generate,verify}