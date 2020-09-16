

function errHandler ( err, req, res, next) {
    console.log('error handler >>>',err, '<<< error handler')

    let errors = []
    let statusCode = 500

    switch (err.name) {
        case 'SequelizeValidationError':
            err.errors.forEach(el => {
                errors.push(el.message)
            });
            statusCode = 400
            
            break;
        case 'JsonWebTokenError':
            
            errors.push('Invalid email or password')
            
            statusCode = 401
            
            break;
        default:
            errors.push(err.message)
            statusCode = err.statusCode
            break;
    }

    return res.status(statusCode).json({errors})
}

module.exports = errHandler