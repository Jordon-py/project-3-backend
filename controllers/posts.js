const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const verifyToken = require('../middleware/verify-token');

// Get all posts with populated comments
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' }
      });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new post
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const post = new Post({
      title,
      content,
      author: req.user._id
    });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a post
router.put('/:postId', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: req.params.postId, author: req.user._id },
      { title, content },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found or not authorized' });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a post
router.delete('/:postId', verifyToken, async (req, res) => {
    try {
      const post = await Post.findOneAndDelete({
        _id: req.params.postId,
        author: req.user._id
      });
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found or not authorized' });
      }
  
      // Also remove associated comments
      await Comment.deleteMany({ post: req.params.postId });
  
      res.status(200).json({ message: 'Post and associated comments deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
