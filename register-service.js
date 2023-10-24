const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cors = require('cors');
const User = require('./models/user'); // Import the User model from the shared library

const router = express.Router(); // Create a router

// ... other imports and configurations ...

// Registration endpoint
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', detail: error.message });
  }
});

module.exports = router; // Export the router
