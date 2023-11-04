const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('./models/user'); // Import the User model from the shared library
const Profile = require('./models/profile'); // Import the Profile model

const router = express.Router(); // Create a router

// ... other imports and configurations ...
mongoose.connect('mongodb://localhost:27017/job_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.use(bodyParser.json());
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
     // Check if a profile exists for the user
     const userProfile = await Profile.findOne({ userId: user._id });

     // Set the hasProfile flag based on the presence of a profile
     const hasProfile = userProfile ? true : false;

    req.session.userId = user._id;

    return res.status(200).json({ message: 'ok',hasProfile });
  } catch (error) {
    return res.status(500).json({ error: 'Login failed', detail: error.message });
  }
});

module.exports = router; // Export the router
