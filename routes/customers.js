const { Customer, validate } = require('../models/customer');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async(req, res) => {
  console.log("logging here", req.params);
  const customers = await Customer.find().sort({name: 1});
  res.send(customers);
});

router.post('/', async(req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });
  customer = await customer.save();
  res.status(201).send(customer);
});


router.get('/:id', async(req, res) => {
  const customer = await Customer.findById(req.params.id);
  if(!customer) return res.status(404).send(`could not find the customer with id: ${req.params.id}`);
  res.send(customer);
});

router.put('/:id', async(req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  }, {new: true});
  if(!customer) return res.status(404).send(`could not find the customer with id: ${req.params.id}`);
  res.send(customer);
});

router.delete('/:id', async(req, res) => {
  const customer = await Customer.findOneAndDelete({_id: req.params.id});
  if(!customer) return res.status(404).send(`could not find the customer with id: ${req.params.id}`);
  res.send(customer);
});

module.exports = router;
