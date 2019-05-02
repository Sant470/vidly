const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const router = express.Router();

Fawn.init(mongoose);

// list rentals i.e list api
router.get('/', async(req, res) => {
  const rentals = await Rental.find().sort({dateOut: -1});
  res.send(rentals);
});

// create a rental i.e create api
router.post('/', async(req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findById(req.body.customerId);
  if(!customer) return res.status(404).send(`could not find customer with id: ${req.body.customerId}`);
  const movie = await Movie.findById(req.body.movieId);
  if(!movie) return res.status(404).send(`could not find movie with id: ${req.body.movieId}`);
  if(movie.numberInStock === 0) return res.status(400).send(`movie is not in stock`);
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', {_id: movie._id}, {$inc: {numberInStock: -1}})
      .run();
    res.send(rental);
  }
  catch(ex) {
    res.status(500).send('something went wrong');
  }
});

// show a rental, details api
router.get('/:id', async(req, res) => {
  const rental = await Rental.findById(req.params.body);
  if(!rental) return res.status(404).send(`could not find rental with id: ${req.params.id}`);
  res.send(rental);
});

// delete a rental, delete api
router.delete('/:id', async(req, res) => {
  const rental = await Rental.findOneAndDelete({_id: req.params.id});
  if(!rental) return res.status(404).send(`could not find rental with id: ${req.params.id}`);
  res.send(rental);
});

module.exports = router;
