module.exports = (err, req, res, next) => {
    // console.log(err);
    let message = ['Internal server error']
    let statusCode = 500

    if (err.name == 'SequelizeValidationError') {
        statusCode = 400
        if (err.errors.length > 1) {
            let errors = []
            err.errors.forEach(el => {
                errors.push(el.message)
            });
            message = errors
        } else {
            message = err.errors[0].message
        }
    }
    if (err.errCode == 'FORBIDDEN') {
        statusCode = 403
        message = err.msg || ['Not allowed']
    }
    if (err.errCode == 'NOT_FOUND') {
        statusCode = 404
        message = ['Data not Found']
    }
    if (err.errCode == 'INVALID_ACCOUNT' || err.name == 'JsonWebTokenError') {
        statusCode = 401
        message = err.msg ? err.msg : ['Invalid password or email']
    }
    res.status(statusCode).json({ message })
} 