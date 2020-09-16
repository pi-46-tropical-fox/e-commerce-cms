const ErrHandler = (err, req, res, next) => {
    let errors = [];
    let statusCode = 500;
    switch (err.name) {
        case 'SequelizeValidationError':
            err.errors.forEach(el => {
                errors.push(el.message)
            });
            statusCode = 400;
            break;
        case 'secretOrPrivateKey':
            err.errors.forEach(el => {
                errors.push(el.message)
            });
            statusCode = 400;
            break;
        case 'JsonWebTokenError':
            errors.push('User is not authenticated')
            statusCode = 401;
            break;
        default:
            errors.push(err.message || "Internal Server Error")
            statusCode = err.statusCode || statusCode
            break;
    }
    res.status(statusCode).json({ errors })
}


module.exports = ErrHandler