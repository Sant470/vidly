const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');

const app = express();
app.use(express.json());

app.use('/api/genres', genres);

// connecting to vidly database
mongoose.connect('mongodb://localhost/vidly')
  .then(() => { console.log('connected to the database vidly ')})
  .catch( err => { console.log('could not connect to the database ', err )});


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listeining on port ${port} ...`))
