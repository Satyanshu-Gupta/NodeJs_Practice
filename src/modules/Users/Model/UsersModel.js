const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const Role = require('../../Roles/Model/RolesModel');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: true,
});

User.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = User;
