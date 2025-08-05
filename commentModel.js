const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    page: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'The page where the comment was made (e.g., worldwar1, worldwar2, etc.)'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userImage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    timestamps: true
});

module.exports = Comment; 