const express = require('express');
const router = express.Router();
const JobListing = require('./models/job');
const multer = require('multer'); // For handling file uploads
const path = require('path');
const Profile = require('./models/profile');

// Your authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    // The user is authenticated
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Create job listing for a logged-in user
router.post('/create', isAuthenticated, async (req, res) => {
    try {
      const jobListingData = req.body;
  
      // Add the user's ID to the job listing
      jobListingData.userId = req.session.userId;
  
      // Create a new job listing and populate the "company" field
      const newJobListing = new JobListing({
        ...jobListingData,
        company: jobListingData.company,
      });
  
      console.log(newJobListing);
  
      const jobListing = await newJobListing.save();
      res.status(201).json(jobListing);
    } catch (error) {
      res.status(500).json({ error: 'Job listing creation failed', detail: error.message });
    }
  });
  
  router.get('/list', async (req, res) => {
    try {
      // Fetch all job listings from the database
      const jobListings = await JobListing.find();
  
      // Respond with the list of job listings
      res.status(200).json(jobListings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve job listings', detail: error.message });
    }
  });

// Configure file upload using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Uploads will be stored in the 'uploads' directory
    },
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    },
  });

  const upload = multer({ storage });

  router.post('/apply/:jobId', isAuthenticated, upload.single('cv'), async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const userId = req.session.userId;
  console.log(userId)
      // Check if the user has already applied to the job listing
      const user = await Profile.findOne({ userId: userId }).populate('userId');
      console.log(user)
      if (!user) {
        return res.status(400).json({ error: 'User not found.' });
      }
            if (user.appliedJobs.includes(jobId)) {
        return res.status(400).json({ error: 'You have already applied for this job.' });
      }
  
      // Update the user's profile with the CV file path
      user.cv = req.file.path;
      await user.save();
  
      // Update the job listing to include the user's application
      const jobListing = await JobListing.findByIdAndUpdate(jobId, {
        $push: { applications: { user: userId, cv: user.cv } },
      });
  
      // Add the jobId to the user's appliedJobs array
      user.appliedJobs.push(jobId);
      await user.save();
  
      res.status(200).json({ message: 'Application submitted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Application submission failed', detail: error.message });
    }
  });
  
  router.post('/save/:jobId', isAuthenticated, async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const userId = req.session.userId;
      const user = await Profile.findOne({ userId: userId });
  
      if (!user) {
        return res.status(400).json({ error: 'User not found.' });
      }
  
      // Add the job listing ID to the savedJobs array
      user.savedJobs.push(jobId);
      await user.save();
  
      res.status(200).json({ message: 'Job saved successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Job saving failed', detail: error.message });
    }
  });
  
  // Get saved and applied jobs
  router.get('/saved', isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId;
      const user = await Profile.findOne({ userId: userId });
  
      if (!user) {
        return res.status(400).json({ error: 'User not found.' });
      }
  
      const savedJobs = user.savedJobs;
  
      // Query the JobListing model to retrieve job details for saved and applied jobs
      const savedJobListings = await JobListing.find({ _id: { $in: savedJobs } });
  
      res.status(200).json({ savedJobs: savedJobListings });
    } catch (error) {
      res.status(500).json({ error: 'Job retrieval failed', detail: error.message });
    }
  });

  router.post('/save/:jobId', isAuthenticated, async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const userId = req.session.userId;
      const user = await Profile.findOne({ userId: userId });
  
      if (!user) {
        return res.status(400).json({ error: 'User not found.' });
      }
  
      // Add the job listing ID to the savedJobs array
      user.savedJobs.push(jobId);
      await user.save();
  
      res.status(200).json({ message: 'Job saved successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Job saving failed', detail: error.message });
    }
  });
  
  // Get saved and applied jobs
  router.get('/applied', isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId;
      const user = await Profile.findOne({ userId: userId });
  
      if (!user) {
        return res.status(400).json({ error: 'User not found.' });
      }
  
      const appliedJobs = user.appliedJobs;
  
      const appliedJobListings = await JobListing.find({ _id: { $in: appliedJobs } });
  
      res.status(200).json({ appliedJobs: appliedJobListings });
    } catch (error) {
      res.status(500).json({ error: 'Job retrieval failed', detail: error.message });
    }
  });

module.exports = router;
