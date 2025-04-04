const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');

// Placeholder for community controller
const communityController = {
  getPosts: async (req, res) => {
    res.json({ message: 'Posts retrieved' });
  },
  createPost: async (req, res) => {
    res.json({ message: 'Post created' });
  }
};

router.get('/posts', authenticate, communityController.getPosts);
router.post('/posts', authenticate, communityController.createPost);

module.exports = router;
