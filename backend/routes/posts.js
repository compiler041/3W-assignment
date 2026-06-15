const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a post
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { content } = req.body;
    let imageUrl = '';
    
    // Cloudinary might throw an error if keys are "placeholder". We should handle that gracefully.
    if (req.file && req.file.path) {
      imageUrl = req.file.path;
    }

    if (!content && !imageUrl) {
      return res.status(400).json({ message: 'Post must contain either text or an image.' });
    }

    const newPost = new Post({
      userId: req.user,
      username: req.username,
      content,
      imageUrl
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like / Unlike a post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const username = req.username;
    const index = post.likes.indexOf(username);

    if (index === -1) {
      post.likes.push(username); // Like
    } else {
      post.likes.splice(index, 1); // Unlike
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comment on a post
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required.' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      username: req.username,
      text
    };

    post.comments.push(newComment);
    const updatedPost = await post.save();
    
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
