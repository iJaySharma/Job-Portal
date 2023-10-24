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
mongoose.connect('mongodb://localhost:27017/job_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const secretKey = crypto.randomBytes(32).toString('hex');

router.use(bodyParser.json());
router.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000, // Set the session duration to 1 hour (in milliseconds)
    },
  })
);
// Login endpoint
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    req.session.userId = user._id;
    console.log('check1', req.session.userId);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', detail: error.message });
  }
});

module.exports = router; // Export the router
