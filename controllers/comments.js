const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const verifyToken = require('../middleware/verify-token');

// Add a new comment to a post
router.post('/', verifyToken, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    req.body.author = req.user._id,
    req.body.username = req.user.username,
    const post = await Post.findById(req.params.postId);
    post.comments.push(req.body);
    await post.save();


    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a comment
router.put('/:postId/:commentId', verifyToken, async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId, author: req.user._id },
      { content },
      { new: true, runValidators: true }
    );

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found or not authorized' });
    }

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a comment
router.delete('/:postId/:commentId', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.commentId, author: req.user._id });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found or not authorized' });
    }

    const post = await Post.findById(req.params.postId);
    post.comments.pull(req.params.commentId);
    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
