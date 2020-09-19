'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Product.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Name must be filled'
                }
            }
        },
        imageURL: DataTypes.STRING,
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Price must be filled'
                },
                notNull: {
                    args: true,
                    msg: 'Price must be filled'
                },
                isGreaterThanZero(value) {
                    if (value <= 0) {
                        throw new Error(`Price must be greater than 0`)
                    }
                },
                isValidInteger(value) {
                    if (typeof value !== 'number') {
                        throw new Error(`Price must be a valid integer`)
                    }
                }
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Stock must be filled'
                },
                notNull: {
                    args: true,
                    msg: 'Stock must be filled'
                },
                isLessTHanZero(value) {
                    if (value < 0) {
                        throw new Error(`Stock must be equal or greater than 0`)
                    }
                },
                isValidInteger(value) {
                    if (typeof value !== 'number') {
                        throw new Error(`Stock must be a valid integer`)
                    }
                }
            }
        },
        category: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};