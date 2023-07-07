// models/Blog.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User  = require('./User');

const Blog = sequelize.define('blogs', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Blog.belongsTo(User, { foreignKey: 'userId' });


module.exports = Blog;