const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  
  const token = jwt.sign({ email }, 'vulnerable-secret');
  res.json({ token });
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  res.json({ message: 'User created', email });
});

module.exports = router;