const express = require('express');
const bodyParser = require('body-parser');
const Profile = require('./models/profile'); // Define your User model
const mongoose = require('mongoose');
const crypto = require('crypto');
const router = express.Router(); // Create a router
// MongoDB setup
mongoose.connect('mongodb://localhost:27017/job_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


router.use(bodyParser.json());

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  return res.status(401).json({ error1: 'Unauthorized' });
};


// GET endpoint to retrieve the user's profile
router.get('/get', isAuthenticated, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.session.userId); // Convert to ObjectId
    const user = await Profile.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user.profile);
  } catch (error) {
    return res.status(500).json({ error: 'Server error', detail: error.message });
  }
});

// POST endpoint to create or update the user's profile
router.post('/set', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;

    // Try to find the user's profile
    let user = await Profile.findOne({ userId });

    // If the user's profile doesn't exist, create a new one
    if (!user) {
      user = new Profile({ userId, profile: {} }); // Initialize the profile object
    }

    // Extract and update profile information from the request body
    const {
      name,
      selfOverview,
      education,
      experience,
      portfolioLinks,
      contact,
    } = req.body;

    if (name) {
      user.profile.name = name;
    }

    if (selfOverview) {
      user.profile.selfOverview = selfOverview;
    }

    if (education) {
      user.profile.education = education;
    }

    if (experience) {
      user.profile.experience = experience;
    }

    if (portfolioLinks) {
      user.profile.portfolioLinks = portfolioLinks;
    }

    if (contact) {
      user.profile.contact = contact;
    }
console.log(user);
    await user.save();
    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ error: 'Profile creation or update failed', detail: error.message });
  }
});

module.exports = router; // Export the router
