const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
      },
      phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
      },
      isGold: {
        type: Boolean,
        required: true,
        default: false
      }
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 1
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        default: 0
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now()
  },
  dateReturned: {
    type: Date
  },
  RentalFee: {
    type: Number,
    min: 0
    default: 0
  }
}));

function validateRental(rental){
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  }
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;
