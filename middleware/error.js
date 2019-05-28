const winston = require('winston');
module.exports = function(error, req, res, next){
  //log the exception along with the stack
  winston.error(error.message, error);
  res.status(500).send('Unexpected error');
};
