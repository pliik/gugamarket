/**
 * Created by Pedro Cancela on 31-05-2014.
 */
var userController = require('../controller/User');

// var BearerStrategy = require('passport-http-bearer').Strategy;

/*
exports.getHttpBearer = new BearerStrategy({
  },
  function(token, done) {
    // asynchronous validation, for effect...
    process.nextTick(function () {
      
      // Find the user by token.  If there is no user with the given token, set
      // the user to `false` to indicate failure.  Otherwise, return the
      // authenticated `user`.  Note that in a production-ready application, one
      // would want to validate the token for authenticity.
      userController.findByToken(token, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      })
    });
  }
); */

// This method only supports OAuth 2.0 strategies
exports.getOAuth2Strategy = function(provider, baseUrl) {

    var Strategy;
    var options;

    switch(provider) {
        case 'facebook':
            options = {
                clientID: '657889074292416',
                clientSecret: '29c4bf5607d59d1e5990eeb0d1a1b6a4',
                callbackURL: baseUrl + '/auth/facebook/callback'
            };
            Strategy = require('passport-facebook').Strategy;
            break;
        case 'google':
            options = {
                clientID: '1013242587626-hbsdbjd5uq27h8kaviil6ls38k197dro.apps.googleusercontent.com',
                clientSecret: 'Ig4IpST3PN3dzzG5mXBS55NG',
                callbackURL: baseUrl + '/auth/google/callback'
            };
            Strategy = require('passport-google-oauth').OAuth2Strategy;
            break;
    }

    return new Strategy(
        options,
        userController.validateOAuth2User
    );
};