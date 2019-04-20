const Joi = require('joi');
const { genreSchema } = require('./genre');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
});

const Movie = new mongoose.model('Movie', movieSchema);

function validateMovie(movie){
  const schema = {
    title: Joi.string().min(1).required(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0),
    genreId: Joi.string().required()
  }
  return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.movieSchema = movieSchema;
module.exports.validate = validateMovie;
