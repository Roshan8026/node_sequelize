// models/Blog.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User  = require('./User');

const Comment = sequelize.define('comments', {
    comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blog_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parent_comment_id: {
    type: DataTypes.INTEGER,
    allowNull: null,
  },
});


module.exports = Comment;