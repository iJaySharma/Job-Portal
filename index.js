const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cors = require('cors');
const loginRouter = require('./login-service');
const registerRouter = require('./register-service'); 
const profileRouter = require('./profile-service'); 
const jobRouter = require('./job-service');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

mongoose.connect('mongodb://localhost:27017/job_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const secretKey = crypto.randomBytes(32).toString('hex');

app.use(bodyParser.json());

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);

app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/profile', profileRouter);
app.use('/api/job', jobRouter);

app.listen(port, () => {
  console.log(`Main service is running on port ${port}`);
});
