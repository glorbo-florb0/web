const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM('clothing', 'accessories', 'books', 'models', 'posters'),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    tags: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Array of tags for the product'
    }
}, {
    timestamps: true
});

module.exports = Product; 