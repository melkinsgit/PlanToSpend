function isLoggedIn(req, res, next){
	if (req.isAuthenticated()){

    console.log('The user is:')
    console.log(req.user);
		return next();

  }
  console.log('No-one is logged in, redirect to home')
  res.redirect('/');
}

module.exports = isLoggedIn
