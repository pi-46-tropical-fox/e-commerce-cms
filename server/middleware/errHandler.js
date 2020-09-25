const errHandler = (err, req, res, next) => {
    let code = 500
    let message = []

    if(err.code){
        code = err.code
        message.push(err.message)
    } else if(err.name) {
        console.error(err.name);
        switch(err.name){
            case 'SequelizeValidationError':
                err.errors.forEach(error => {
                    message.push(error.message)
                })
                code = 400
            break
            
            // TODO: will delete one of these cases
            case 'SequelizeUniqueConstraintError':
            case 'SequelizeUniqueConstraintsError':
                err.errors.forEach(error => {
                    message.push(error.message)
                })

                code = 409 // for conflict reason
                // source: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
            break

            // NOTE:
            // The "Unauthorized" error should be 401, not 403
            // https://lists.w3.org/Archives/Public/ietf-http-wg/2014AprJun/1080.html
            // Error 403 is for "Access Denied"/"Forbidden" HTTP error
            case 'JsonWebTokenError':
                console.error(err);
                message.push(err.message)

                code = 401
            break

            default:
                console.log(err);
                message.push("Whoops! Something happened on our end!")
            break
        }
    }

    res.status(code).json(message)
}

module.exports = errHandler