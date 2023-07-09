// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Blog  = require('./Blog');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Blog, { foreignKey: 'userId' });

module.exports = User;