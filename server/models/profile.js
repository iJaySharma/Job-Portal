const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  profile: {
    name: {
      firstName: String,
      lastName: String,
    },
    selfOverview: String,
    education: [
      {
        institute: String,
        degree: String,
        aggregate: Number,
        passingDate: Date,
      },
    ],
    experience: [
      {
        jobTitle: String,
        companyName: String,
        description: String,
        period: String,
      },
    ],
    portfolioLinks: [String],
    contact: {
      email: String,
      phone: String,
      address: String,
    },
  },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobListing' }],
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobListing' }],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
