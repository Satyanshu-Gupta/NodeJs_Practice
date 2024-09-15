// models/role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Role = sequelize.define('Roles', {
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING(55),
        unique: true,
        allowNull: false
    }
});

module.exports = Role;
