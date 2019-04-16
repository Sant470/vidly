const Joi = require('joi');
const mongoose = require('mongoose');


const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    lowercase: true
  }
}));

function validateRequest(genre){
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(genre, schema);
}

module.exports.Genre = Genre;
module.exports.validate = validateRequest;
