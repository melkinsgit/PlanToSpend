// passport js

var LocalStrategy = require('passport-local').Strategy;  // allows local user authentication

// needs the User schema
var User = require('../models/user');

// this is function it exports, when the require is used in app js the function with parameter passport is the required element
module.exports = function(passport) {

  //Passport session setup. Need the ability to
  // serialize (save to disk - a database) and
  // unserialize (extract from database) sessions.

  // save user in session store (save to database)
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  //Get user by ID, from session store (extract/retrieve from database)
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    })
  });


  //Whole world of callbacks.

  //Note the done() method, which has various signatures.

  /*    done(app_err, user_err_or_success, messages);
   done(err);
   means there's been a DB or app error - this is not typical.
   Use to indicates issue with DB or infrastructure or something YOU need to fix.
   done(null, false);
   first parameter is for app error - it's null because this is a *user* error.
   Second parameter is false to indicate USER error in login. e.g. wrong password,
   wrong username, trying to sign up with username that already exists...
   Very common issue, your app will decide how to deal with this.
   done(null, false, msg);
   As before, plus msg parameter to provide error message that app may display to user
   done(null, user);
   Success! null=no app error,
   user = new user object created, or authenticated user object
   done(null, user, msg);
   Variation of the previous call. null=no app error,
   user = new user or authenticated user object,
   msg=messages for app to display to user
   */

  //Sign up new user.
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    //https://nodejs.org/api/process.html#process_process_nexttick_callback_arg
    //Once the current event loop turn runs to completion, call the callback function.
    process.nextTick(function () {

		console.log('in next tick user name is ' + username);

      //Search for user with this username.
      User.findOne({'local.username': username}, function (err, user) {
		if (err) {
          return done(err);    //database error
        }

        //Check to see if there is already a user with that username
        if (user) {
          console.log('user with that name exists');
          return done(null, false, req.flash('signupMessage', 'Sorry, username already taken'));
        }

        //else, the username is available. Create a new user, and save to DB.
        var newUser = new User();
		console.log('new user object');
		console.log(newUser);
        newUser.local.username = username;
		// generateHash ensures that actual password can't be read from database
		// generateHash is defined in the user model, so it's called on the newUser
		// generateHash takes the argument password and sets the local.password value
		// that will be saved in the DB for the newUser to the hashed value
        newUser.local.password = newUser.generateHash(password);
		console.log('this is the user object');
		console.log(newUser);

        newUser.save(function (err) {
          if (err) {
            throw err;
          }
          //If new user is saved successfully, all went well. Return new user object.
          return done(null, newUser, "You've logged in!")
        });
      });
    });
  }));


  passport.use('local-login', new LocalStrategy({
      usernameField:'username',
      passwordField:'password',
      passReqToCallback : true
    },

    function(req, username, password, done){
      process.nextTick(function() {

		// find the user, this time we want the user to exist or they're logging in with the wrong info
        User.findOne({'local.username': username}, function (err, user) {

          if (err) {
            return done(err)
          }
          if (!user) {
            return done(null, false, req.flash('loginMessage', 'User not found'))
          }
          //This method is defined in our user.js model - validMethods returns trues or false
          if (!user.validPassword(password)) {
            return done(null, false, req.flash('loginMessage', 'Wrong password'));
          }

		  // this user is now signed in
      console.log('this user is signed in')
      console.log(user)

          return done(null, user);
        })
      });
    }));

};   //end of outermost callback!
