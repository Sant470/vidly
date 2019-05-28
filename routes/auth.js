const bcrypt = require('bcrypt');
const { User, validateAuth } = require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.post('/', async(req, res) => {
  const { error } = validateAuth(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(401).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(401).send('Invalid email or password');
  res.send({user: {_id: user._id, name: user.name, email: user.email}, authToken: user.generateAuthToken()});
});

module.exports = router;
