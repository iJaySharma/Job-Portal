const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cors = require('cors');
const MongoStore = require('connect-mongo')
const loginRouter = require('./login-service');
const registerRouter = require('./register-service'); 
const profileRouter = require('./profile-service'); 
const jobRouter = require('./job-service');

const app = express();
const secretKey = crypto.randomBytes(32).toString('hex');

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: MongoStore.create({ 
      mongoUrl: 'mongodb://localhost:27017/job_portal',
      mongooseConnection: mongoose.connection
    }),
    })
);

const port = process.env.PORT || 3000;


app.use(cors({ origin: 'http://localhost:4200', credentials: true }));


app.use(bodyParser.json());

app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/profile',profileRouter);
app.use('/api/job', jobRouter);

app.listen(port, () => {
  console.log(`Main service is running on port ${port}`);
});
