const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.post('/', async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if(user) return res.status(409).send('user already exist');
  user = new User(_.pick(req.body, ['name', 'email', 'password', 'admin']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.status(201).send(_.pick(user, ['_id', 'name', 'email', 'admin']));
});



module.exports = router;
