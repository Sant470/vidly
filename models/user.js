const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
});


userSchema.methods.generateAuthToken = function generateAuthToken() {
  return jwt.sign({_id: this._id, email: this.email, name: this.name, admin: this.admin}, config.get('jwtPrivateKey'));
};

const User = mongoose.model('User', userSchema);

function validateUser(user){
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(250).required(),
    admin: Joi.boolean().required()
  }
  return Joi.validate(user, schema);
}

function validateAuth(req){
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(250).required()
  }
  return Joi.validate(req, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
module.exports.validateAuth = validateAuth;
