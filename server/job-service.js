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
  console.log(jobListingData);
      // Add the user's ID to the job listing
      jobListingData.userId = req.session.userId;
  
      // Create a new job listing and populate the "company" field
      const newJobListing = new JobListing(jobListingData);

  
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
      const jobListings = await JobListing.find().select('_id companyname type about headquarter postedDate location requirements salary appliedBy savedBy');

  
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
        return res.status(400).json({ error: 'already applied' });
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
  
      res.status(200).json({ message:'ok' });
    } catch (error) {
      res.status(500).json({ error: 'Job saving failed', detail: error.message });
    }
  });

  router.post('/unsave/:jobId', isAuthenticated, async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const userId = req.session.userId;
      const user = await Profile.findOne({ userId: userId });
  
      if (!user) {
        return res.status(400).json({ error: 'User not found.' });
      }
  
      // Find the index of the job listing in the savedJobs array
      const index = user.savedJobs.indexOf(jobId);
  
      if (index !== -1) {
        // Remove the job listing ID from the savedJobs array
        user.savedJobs.splice(index, 1);
        await user.save();
        res.status(200).json({ message: 'ok' });
      } else {
        // The job listing was not found in the savedJobs array
        res.status(404).json({ error: 'Job not found in saved jobs.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Job unsaving failed', detail: error.message });
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

  router.get('/description/:jobId', async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const job = await JobListing.findById(jobId);
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      res.status(200).json(job);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
