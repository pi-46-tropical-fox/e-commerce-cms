const { verifyToken } = require('../helpers/jwt')
const {User} = require('../models')

const authentication = async (req, res, next) => {
    const { access_token } = req.headers;
    try {
        const userData = verifyToken(access_token);
        let user = await User.findOne({
            where: {
                email: userData.email,
            }
        })

        if (user) {
            req.userData = userData;
            next();
        } 
        else {
            return res.status(401).json({ message: `Doesnt recognize user..` });
        }
    } 
    catch (error) {
        return res.status(401).json({ message: `Doesnt recognize user..` });
    }
}

module.exports = authentication