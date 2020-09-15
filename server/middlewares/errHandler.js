const errHandler = (err, req, res, next) => {
    let errors = []


    switch (err.name) {
        case 'WHERE parameter "email" has invalid "undefined" value':
            console.log('masuk sini');
            break
        case 'ValidationError':
            console.log('salah valid');
            break
        default:
            errors.push(err.message)
            status = err.status || 501
    }

    return res.status(status).json({errors})
}

module.exports = {
    errHandler
}