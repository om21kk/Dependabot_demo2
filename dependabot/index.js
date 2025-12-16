const express = require('express');
const _ = require('lodash');
const moment = require('moment');
const axios = require('axios');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const validator = require('validator');
const nodemailer = require('nodemailer');
const passport = require('passport');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.get('/', (req, res) => {
  const data = {
    message: 'Large Dependabot Test Project!',
    timestamp: moment().format(),
    lodashVersion: _.VERSION,
    nodeVersion: process.version,
    dependencies: Object.keys(require('./package.json').dependencies).length
  };
  
  res.json(data);
});

app.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign({ email }, 'secret-key', { expiresIn: '1h' });
  
  res.json({ token, message: 'User registered' });
});

app.get('/users', (req, res) => {
  const users = _.times(5, (i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    createdAt: moment().subtract(i, 'days').format()
  }));
  
  res.json(users);
});

app.listen(port, () => {
  console.log(`Large test app running at http://localhost:${port}`);
});