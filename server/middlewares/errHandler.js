const errHandler = (err, req, res, next) => {
    let errors = []
    console.log(err);

    switch (err.name) {
        case 'JsonWebTokenError':
            errors.push('User not authenticated')
            status = 401
            break
        case 'SequelizeUniqueConstraintError':
            err.errors.forEach(error => {
                errors.push(error.message)
            })
            status = 400
            break
        case 'SequelizeValidationError':
            err.errors.forEach(error => {
                errors.push(error.message)
            })
            status = 400
            break
        default:
            errors.push(err.message)
            status = err.status || 500
    }

    return res.status(status).json({errors})
}

module.exports = {
    errHandler
}