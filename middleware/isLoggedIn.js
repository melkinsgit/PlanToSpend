// is logged in middleware

function isLoggedIn(req, res, next){
	console.log('*****************');
	console.log(req.user);
	if (req.isAuthenticated()){
		return next();
  }
  res.redirect('/');
}

module.exports = isLoggedIn