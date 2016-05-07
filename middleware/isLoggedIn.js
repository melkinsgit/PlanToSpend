// is logged in middleware

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()){
		console.log('user ' + req.user.local.username + ' is LOGGED IN');
		return next();
  }
  console.log('this user is NOT logged in');
  console.log(req.user);
  res.redirect('/');
}

module.exports = isLoggedIn;