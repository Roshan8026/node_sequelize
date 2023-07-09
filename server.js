// server.js

const express        = require('express');
const { Op }         = require('sequelize');
const sequelize      = require('./config/database');
const jwt            = require('jsonwebtoken');
const multer         = require('multer');
const User           = require('./models/User');
const Blog           = require('./models/Blog');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const app            = express();
app.use(express.json());

// Synchronize models with the database
sequelize.sync()
  .then(() => {
    console.log('Models synchronized with the database');
  })
  .catch((error) => {
    console.error('Failed to synchronize models:', error);
  });

  // Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
};



    // Configure multer for handling form data
    const upload = multer();
  
    // Registration route
    app.post('/register',  upload.none(), authController.register);

    // Login route
    app.post('/login', upload.none(), authController.login);

    // User route
    app.get('/users', verifyToken,  userController.getUser);
    
    //Crud Operation performe on BlogPosts

    app.get('/post', verifyToken, userController.getBlog);

    app.post('/post', verifyToken,  upload.none(), userController.postBlog);


    app.put('/posts/:id', verifyToken, upload.none(),  userController.updateBlog);


    app.delete('/posts/:id',verifyToken, userController.deleteBlog);


    // comments

    app.post('/posts/:blogId/comments', verifyToken , upload.none(), userController.createComment);

    //List comment for specific blog

    app.get('/posts/:blogId', verifyToken , userController.listComment);



    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });