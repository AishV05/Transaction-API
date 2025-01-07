const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:id', async (req, res) => {
  console.log(`Fetching user with ID: ${req.params.id}`);
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log(`User with ID ${req.params.id} not found`);
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(`User fetched:`, user);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;