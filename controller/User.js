/**
 * Created by Pedro Cancela on 01-06-2014.
 */

var _this = this;

// var basePath = ('development' == process.env.NODE_ENV) ? '/javascripts/dashboard/index.html' : '/';

var basePath = "/";

require('date-utils');

exports.getSwaggerToken = function(req,res,done) {
  // asynchronous validation, for effect...

  console.log(req.query.token);

  process.nextTick(function () {

        // Find the user by token.  If there is no user with the given token, set
        // the user to `false` to indicate failure.  Otherwise, return the
        // authenticated `user`.  Note that in a production-ready application, one
        // would want to validate the token for authenticity.

        // console.log(req);      
        var UserModel = exports.model.User;

        UserModel.findOne({ token: req.query.token,
                            active :"1" }, function(err, user) {
            if(err) {
                console.log(err);
            }

            if (!err && user != null) {


                var start = user.updated;
                var end = start.clone();
                
                end.add({ milliseconds: 0,
                            minutes: 0,
                            hours: 0,
                            seconds: 0,
                            days: 0,
                            weeks: 0,
                            months: 12,
                            years: 0});
                
        
                // console.log('user found:'+req.query.token);
                // console.log(user);
                var now = new Date();
                console.log(start);
                console.log(now);
                console.log(end);

                console.log('---user---');
                console.log('--- existing ---');
                console.log(user); 

                if (now <= end && now >= start) {

                    console.log(start);
                    console.log(now);
                    console.log(end);

                    done(req,res,user);

                } else {

                    console.log('--- denied by timeout ---');

                    user.token = '_';
                    user.active = "0";
                    // user.refreshToken = refreshToken;
                    user.save(function(err) {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("updating user after timeout...");
                        };
                    });

                    console.log('Now:' + now + ' START:' + start + ' END:' + end);

                    res.send(403, {
                      success: false,
                      message: 'Access denied (code 1)',
                      reason: 'token timeout'
                    }); 
                }
                

            } else {

                console.log('--- user not found ---');
                    res.send(403, {
                      success: false,
                      message: 'Access denied (code 2)',
                      reason : 'user not found'
                    }); 


            };
        }); 

  });
};
        
exports.serializeUser = function(user, done) {
    done(null, user);
};

exports.deserializeUser = function(user, done) {
    exports.model.User.findById(user._id, function(err, user) {
        //console.log(user);
            if(!err) {
                done(null, user);
            } else {
                done(err, null);
            }
        }
    );
};

exports.revokeToken = function(intoken,res){
    // uidToSend is a email
    var UserModel = exports.model.User;

    UserModel.findOne({ /*email: user, */token: intoken, active : "1" }, function(err, user) {
        if(err) {
            console.log(err);
            return res.send(err);
        }

        if (!err && user != null) {
            user.active = "0";
            user.token='-';
            // user.refreshToken = refreshToken;
            console.log("requesting token revoke...");
            user.save(function(err) {
                if(err) {
                    console.log(err);
                    return res.send(err);
                } else {
                    console.log("revoked token...");
                    return res.send({token:intoken});
                };
            });
        } else {
                res.send(403, {
                  success: false,
                  message: 'Token not found (code 1)',
                  reason: 'token does not exist'
                }); 
        }
    });

}

exports.validateEmailUser = function(tokenToSend,uidToSend,done){
    // uidToSend is a email
    var UserModel = exports.model.User;

    console.log('--> validateEmailUser '+uidToSend);

    UserModel.findOne({ email: uidToSend }, function(err, user) {
        if(err) {
            console.log('finding user error');
            console.log(err);
        }

        if (!err && user != null) {
            user.token = tokenToSend;
            user.active = "1";
            user.updated = Date.now();
            // user.refreshToken = refreshToken;
            console.log("requesting user update...");
            user.save(function(err) {
                if(err) {
                    console.log('update user error');
                    console.log(err);
                } else {
                    console.log("updated user passless...");
                    if (done) done(null, user);
                };
            });
            // done(null, user);
        } else {

            this.token = tokenToSend;
            this.active = "1";
            //this.refreshToken = refreshToken;
            
            // this.providerId = profile.id;
            // this.name = profile.displayName;
            this.email = uidToSend;
            //this.photoUrl = profile.photos[0].value;
            this.provider = 'mail';
            this.updated = this.created = Date.now();
            user = new UserModel(this);

            console.log("requesting user create...");
            user.save(function(err) {
                if(err) {
                    console.log('create user error');
                    console.log(err);
                } else {
                    console.log("saving user email...");
                    if (done)done(null, user);
                };
            });
        };
    });

}

exports.validateOAuth2User = function(accessToken, refreshToken, profile, done) {

    var UserModel = exports.model.User;

    UserModel.findOne({ providerId: profile.id }, function(err, user) {
        if(err) {
            console.log(err);
        }

        if (!err && user != null) {
            user.token = accessToken;
            user.active = "1";
            user.refreshToken = refreshToken;
            this.updated = Date.now();
            user.save(function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("updating user ...");
                    done(null, user);
                };
            });
            // done(null, user);
        } else {

            this.token = accessToken;
            this.refreshToken = refreshToken;
            this.active = "1";
            this.providerId = profile.id;
            this.name = profile.displayName;
            this.email = (profile.emails !== undefined) ? profile.emails[0].value : 'N/A';
            //this.photoUrl = profile.photos[0].value;
            this.provider = profile.provider;
            this.updated = this.created = Date.now();
            user = new UserModel(this);

            user.save(function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("saving user ...");
                    done(null, user);
                };
            });
        };
    });
};

exports.authenticate = function(provider) {

    // console.log(req.headers)

    var appModule = require('../app');
    var options;

    switch(provider) {
        case 'facebook':
            options = {
                scope: ['email'],
                failureRedirect: basePath
            };
            break;
        case 'google':
            options = {
                // callbackURL:'jj',
                scope: [
                    'https://www.googleapis.com/auth/userinfo.profile',
                    'https://www.googleapis.com/auth/userinfo.email'
                ],
                failureRedirect: basePath
            };
            break;
    } 

    return appModule.passport.authenticate(provider, options);

};

exports.account = function(req, res){ 

    var referer = req.session.redirect;
    var provider = req.session.provider;

    if (!referer) {
        console.log('no referer for login');
        console.log(req.user);
        res.send(403, {
          message: 'Access denied'
        }); 
    }



    res.render('account', { 
        title: 'Pliik'
        , user: req.user
        , referer : referer
        , rootPath: basePath });

    _this.resetProviderToken(provider,req.user.token);

    req.logout();    

};

exports.resetProviderToken = function(provider,token){

    var https = require('https');

    var options = '';

    switch(provider){
        case 'google': 
            options = 
            { 
                host: 'accounts.google.com',
                path: '/o/oauth2/revoke?token=' + token
            };
            break;
        default:
            return;
    }

    var req = https.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    req.end();

}

/*
exports.callback = function(req, res) {

    res.redirect('/account/' + req.session.redirect);
    // delete req.session.redirect;
}; */

/*
exports.logout = function(req, res){
    req.logout();
    //var unauthenticated = req.isUnauthenticated();
    res.redirect('',basePath);
};
*/

// Special function to test authentication
/*
exports.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    routeUnauthenticated(req, res);
};
*/

/*
exports.sendDisclosableUser = function(req, res) {

    var user = req.session.passport.user;

    res.send({
        success: true,
        User: {
            _id: user._id,
            name: user.name,
            email: user.email,
            provider: user.provider
        }
    });
};
*/
/*
var routeUnauthenticated = function (req, res) {
    if(req.route.path == "/api/user") {
        //res.setHeader('Content-Type', 'application/json');
        res.send({ 'success': false });
    } else {
        res.redirect(basePath);
    }
};
*/