const bcrypt = require('bcrypt');
const config = require('config');

module.exports = function(req, res, next){
  const authorization = req.header('Authorization');
  if(!authorization) return res.status(401).send('Access Denied, no Authorization token provided');
  try {
    const payload = bcrypt.compare(authorization, config.get('jwtPrivateKey'));
    req.user = payload
    next();
  } catch(ex){
    console.log(ex);
    res.status(400).send('Invalid Authorization Token');
  }
};
