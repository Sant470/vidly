const Joi = require('joi');
const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    lowercase: true
  }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateRequest(genre){
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(genre, schema);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateRequest;
