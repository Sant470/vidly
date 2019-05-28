module.exports = function(req, res, next) {
  console.log(req.user.admin);
  if(!req.user.admin) return res.status(403).send('Access Denied');
  next();
}
