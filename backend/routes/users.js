const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get suggested users
router.get('/suggested', auth, async (req, res) => {
  try {
    const users = await User.find({ username: { $ne: req.username } }).limit(5).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Follow / Unfollow a user
router.post('/:username/follow', auth, async (req, res) => {
  try {
    const targetUsername = req.params.username;
    const currentUsername = req.username;

    if (targetUsername === currentUsername) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const targetUser = await User.findOne({ username: targetUsername });
    const currentUser = await User.findOne({ username: currentUsername });

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = currentUser.following.includes(targetUsername);

    if (isFollowing) {
      // Unfollow
      currentUser.following = currentUser.following.filter(u => u !== targetUsername);
      targetUser.followers = targetUser.followers.filter(u => u !== currentUsername);
    } else {
      // Follow
      currentUser.following.push(targetUsername);
      targetUser.followers.push(currentUsername);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({ following: currentUser.following });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
