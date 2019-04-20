const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  }
}));

function validateRequest(customer){
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(10).required()
  };
  return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateRequest;
