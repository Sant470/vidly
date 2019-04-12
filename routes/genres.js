const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const router = express.Router();


const Genre = new mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  }
}));

function validateRequest(genre){
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(genre, schema);
}

// get list of genres i.e index
router.get('/', async(req, res) =>{
  const genres = await Genre.find().sort({name: 1});
  res.send(genres);
});

// create a genre i.e create
router.post('/', async(req, res) => {
  const { error } = validateRequest(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({
    name: req.body.name;
  });
  genre = await genre.save()
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
  let genre = await Genre.find({_id: req.params.id});
  if(!genre) return res.status(404).send(`could not find genre with id: ${req.params.id}`);

  const { error } = validateRequest(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  genre = await gnre.save();
  res.send(genre);
});

// delete a genre i.e delete
router.delete('/:id', (req, res) =>{
  let genre = genres.findOneAndDelete(_id: req.params.id);
  if(!genre) return res.status(404).send(`could not find the genre with id: ${req.params.id}`);
  res.send(genre);
});

module.exports = router;
