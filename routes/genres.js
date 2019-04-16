const express = require('express');
const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const router = express.Router();

// get list of genres i.e index
router.get('/', async(req, res) =>{
  const genres = await Genre.find().sort({name: 1});
  res.send(genres);
});

// create a genre i.e create
router.post('/', async(req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  res.send(genre);
});

// show a genre i.e show
router.get('/:id', async(req, res) => {
  const genre = await Genre.find({ _id: req.params.id});
  if(!genre) return res.status(404).send(`could not find genre with id: ${req.params.id}`);
  res.send(genre);
});


// update a genre i.e update
router.put('/:id', async(req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
  if(!genre) return res.status(404).send(`could not find genre with id: ${req.params.id}`);
  res.send(genre);
});

// delete a genre i.e delete
router.delete('/:id', async(req, res) =>{
  const genre = await Genre.findOneAndDelete({_id: req.params.id});
  if(!genre) return res.status(404).send(`could not find the genre with id: ${req.params.id}`);
  res.send(genre);
});

module.exports = router;
