'use strict';
const { hashSync } = require('bcryptjs');
const {
    Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invalid Email Format'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 100],
                    msg: 'Password must contain min. 6 and max. 100 characters'
                }
            }
        },
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate(user, options) {
                const hashed = hash(user.password)
                user.password = hashed
                if(!user.role){
                    user.role = 'customer'
                }
            }
        }
    });
    return User;
};