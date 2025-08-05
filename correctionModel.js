const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

const Correction = sequelize.define('Correction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    page: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'The page where the correction was suggested'
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'The specific section or content that needs correction'
    },
    currentContent: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'The current content that needs to be corrected'
    },
    suggestedContent: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'The suggested correction'
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'Reason for the correction'
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
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
    },
    adminNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Admin notes about the correction'
    }
}, {
    timestamps: true
});

module.exports = Correction; 