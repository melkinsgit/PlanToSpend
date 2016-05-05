// is logged in middleware

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()){
		return next();
  }
  console.log('this user is NOT logged in');
  console.log(req.user);
  res.redirect('/');
}

module.exports = isLoggedIn;