const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected', 'shipped', 'delivered'),
        defaultValue: 'pending',
    },
    shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    contactPhone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adminNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    timestamps: true
});

module.exports = Order; 