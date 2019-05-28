require('express-async-errors');
const winston = require('winston');
const error = require('./middleware/error');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');


const app = express();
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);


winston.handleExceptions(new winston.transports.File({filename: 'error.log'}));

process.on('unhandledRejection', (ex) => {
  throw ex;
});


winston.add(winston.transports.File, {filename: 'error.log'});


if(!(config.get('jwtPrivateKey'))){
  console.log('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

// connecting to vidly database
mongoose.connect('mongodb://localhost/vidly')
  .then(() => { console.log('connected to the database vidly ')})
  .catch( err => { console.log('could not connect to the database ', err )});



const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listeining on port ${port} ...`))
