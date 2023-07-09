// controllers/userController.js

const User    = require('../models/User');
const Blog    = require('../models/Blog');
const Comment = require('../models/Comment');


exports.getUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getBlog = async (req,res) => {
  try {
    const posts = await Blog.findAll({ where: { userId: req.userId } });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while fetching posts' });
  }
}

exports.postBlog = async (req,res) => {
  try{
    const { title, content } = req.body;
    const post  = await Blog.create({
      title,
      content,
      userId: req.userId,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while creating a post' });
  }
}

exports.updateBlog = async (req,res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Blog.findOne({ where: { id, userId: req.userId } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while updating the post' });
  }
}

exports.deleteBlog = async (req,res) => {
  try {
    const { id } = req.params;

    const post = await Blog.findOne({ where: { id, userId: req.userId } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.destroy();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while deleting the post' });
  }
}

exports.createComment = async (req , res) => {
  try {
    const blog_id = req.params.blogId;
    const { comment } = req.body;
    
    if(comment == null){
      res.status(500).json({ error: 'comment is cannot be null' });
    }

    // Create the comment
    const blog_comment = await Comment.create({
      comment,
      blog_id,
      userId: req.userId,
    });

    res.status(201).json(blog_comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the comment.' });
  }
}

exports.listComment = async (req, res ) => {
  try {
    const Comments = await Comment.findAll({ where: { blog_id: req.params.blogId } });
    res.json(Comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while fetching comments' });
  }
}
