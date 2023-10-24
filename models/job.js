const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Ensure that a user is associated with each job listing
  },
  
    companyname: String,
    type: String,
    about: String,
    headquarter: String,
  
  location: {
    city: String,
    state: String,
    country: String,
  },
  requirements: {
    degree: String,
    yearOfExperience: Number,
    profile: String,
    skills: [String],
  },
  salary: Number,
  appliedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

module.exports = JobListing;
