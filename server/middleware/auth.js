const { validate } = require('../helpers/jwt')
const { User, Role } = require('../models')

const authenticate = async (req, res, next) => {
    try {
        let { access_token } = req.headers
        let payload = validate(access_token)

        if (payload) {
            let user = await User.findOne({ where: { email: payload.email }, include: Role })

            if (user) {
                req.user = user

                next()
            } else {
                throw { code: 404, message: "User with email you have is not found" }
            }
        }
    } catch (e) {
        return next(e)
    }
}

const authorize = (req, res, next) => {
    try {
        // let role = Role.findOne({ where: { id: req.user.RoleId } })
        if (req.user.Role.name === 'Administrator') next()
        else throw { code: 401, message: "" }
    } catch (e) {
        return next(e)
    }
}

module.exports = {
    authenticate, authorize
}