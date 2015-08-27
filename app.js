// #!/bin/env node

/*
 _______  ______  ____  _____ ____ ____
| ____\ \/ /  _ \|  _ \| ____/ ___/ ___|
|  _|  \  /| |_) | |_) |  _| \___ \___ \
| |___ /  \|  __/|  _ <| |___ ___) |__) |
|_____/_/\_\_|   |_| \_\_____|____/____/
***********************************************************************/

var express = require('express');

var router = require('./routes/index');
var http = require('http');
var path = require('path');
var errorHandler = require('express-error-handler');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser =  require('cookie-parser');
var session = require('express-session');
var morgan       = require('morgan');

var passport = require('passport')
    , passportController = require('./controller/Passport')
    , userController = require('./controller/User');

// https://github.com/florianheinemann/passwordless
var passwordless = require('passwordless');
var email   = require("emailjs");

var Config   = require('./config/main.js');

module.exports.passport = passport;

var port = "";
var ip = "";
var dbPath = '';
var baseurl = "";
var basecontact = "";
var yourPwd = "";
var yourSmtp = "";
var yourEmail = "";
var yourSSL  = "";

var app = express();

var MongoStore = require('passwordless-mongostore-openshift');

// console.log(process.env.NODE_ENV);
if ( 'development' != process.env.NODE_ENV ) {

    basecontact = Config.prd.basecontact;
    baseurl = Config.prd.baseurl;
    ip = Config.prd.ip;
    port = Config.prd.port;
    dbPath = Config.prd.dbPath;
    yourPwd = Config.prd.yourPwd;
    yourSmtp =  Config.prd.yourSmtp;
    yourEmail =  Config.prd.yourEmail;
    yourSSL = Config.prd.yourSSL;

        // var MongoStore = require('passwordless-mongostore-openshift');
        //  ip="localhost"
        //  port=3000;
        //  baseurl="http://127.0.0.1";
        //dbPath = "mongodb://admin:k6iBDA55yfP8@127.0.0.1:27017/market";
        //   dbPath = "mongodb://admin:1234@127.0.0.1:27017/market";
        //var pathToMongoDb = 'mongodb://localhost/passwordless-simple-mail';

} else {
    //var MongoStore = require('passwordless-mongostore-openshift');
    basecontact = Config.prd.basecontact;
    baseurl = Config.dev.baseurl;
    ip = Config.dev.ip;
    port = Config.dev.port;
    dbPath = Config.dev.dbPath;
    yourPwd = Config.dev.yourPwd;
    yourSmtp =  Config.dev.yourSmtp;
    yourEmail =  Config.dev.yourEmail;
    yourSSL = Config.dev.yourSSL;

    // dbPath = "mongodb://admin:1234@127.0.0.1:27017/market";



    //var pathToMongoDb = 'mongodb://localhost/passwordless-simple-mail';

     /*
    var corsOptions = {
        credentials: false,
        origin: function(origin,callback) {
            if(origin===undefined) {
                callback(null,false);
            } else {
                // change wordnik.com to your allowed domain.
                // var match = origin.match("^(.*)?.wordnik.com(\:[0-9]+)?");
                // var match = origin.match("^(.*)?file://(\:[0-9]+)?");
                var match = origin.match("^(.*)?localhost(\:[0-9]+)?");//
                var allowed = (match!==null && match.length > 0);
                callback(null,allowed);
            }
        }
    };*/
//var yourSmtp = 'smtp.gugamarket.com';

    // app.use(cors());
}


/*
  ____ ___  ____  ____
 / ___/ _ \|  _ \/ ___|
| |  | | | | |_) \___ \
| |__| |_| |  _ < ___) |
 \____\___/|_| \_\____/

 */
// ACTIVATE CORS FOR ALL DOMAINS
var cors = require('cors');
var corsOptions = {
  methods :  ['GET', 'PUT', 'POST','CREATE','DESTROY'],
  origin: function(origin, callback){
    callback(null, true);
  }
};

app.use(cors(corsOptions));

// development only
//mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/

// Set up a delivery service

var smtpServer  = email.server.connect({
   user:      yourEmail,
   password:  yourPwd,
   host:      yourSmtp,
   ssl:       yourSSL
});

// Setup of Passwordless
/*
                     _
 _ __   __ _ ___ ___| | ___  ___ ___
| '_ \ / _` / __/ __| |/ _ \/ __/ __|
| |_) | (_| \__ \__ \ |  __/\__ \__ \
| .__/ \__,_|___/___/_|\___||___/___/
|_|
*/
var passLessController = require('./controller/PassLess')
passLessController.init(yourEmail,passwordless,smtpServer,MongoStore,dbPath);
app.locals.passwordless = passwordless;

var options = {};
if ( 'development' == process.env.NODE_ENV ) {
 	app.use(errorHandler());
}

/**
 __  __
|  \/  | ___  _ __   __ _  ___   ___  ___  ___
| |\/| |/ _ \| '_ \ / _` |/ _ \ / _ \/ __|/ _ \
| |  | | (_) | | | | (_| | (_) | (_) \__ \  __/
|_|  |_|\___/|_| |_|\__, |\___/ \___/|___/\___|
                    |___/
***********************************************************************/


var mongoose = require('mongoose');

//db connection
// console.log(dbPath);
mongoose.connect(dbPath
	,function onMongooseError(err) {
    if (err) throw err;
});
// import the data layer
var mongoose = require('mongoose');
var nestedSetPlugin = require('mongoose-nested-set');

// import the models
var models = {
    // Size: require('./model/Size')(mongoose,this),
    Images: require('./model/Images')(mongoose,this,nestedSetPlugin),
    // Variant: require('./model/Variant')(mongoose,this),
    // Category: require('./model/Category')(mongoose,this,nestedSetPlugin),
    // Product: require('./model/Product')(mongoose,this,nestedSetPlugin),
    Catalog: require('./model/Catalog')(mongoose,this,nestedSetPlugin),
    Geo: require('./model/Geo')(mongoose,this),
    User: require('./model/User')(mongoose)
};

/*
 ____                                _
|  _ \ __ _ ___ ___ _ __   ___  _ __| |_
| |_) / _` / __/ __| '_ \ / _ \| '__| __|
|  __/ (_| \__ \__ \ |_) | (_) | |  | |_
|_|   \__,_|___/___/ .__/ \___/|_|   \__|
                   |_|
 * @type type */



// serialize and deserialize
passport.serializeUser(userController.serializeUser);
passport.deserializeUser(userController.deserializeUser);

// Config passports
passport.use(passportController.getOAuth2Strategy('google', baseurl));
passport.use(passportController.getOAuth2Strategy('facebook', baseurl));

// Bridge Pliik Tokens
// https://github.com/jaredhanson/passport-http-bearer
// Use the BearerStrategy within Passport.
//   Strategies in Passport require a `validate` function, which accept
//   credentials (in this case, a token), and invoke a callback with a user
//   object.


// +-----------------------------------
// all environments
// +-----------------------------------

app.set('port', port);
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
// app.use(express.logger('dev'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(cookieParser());
app.use(session(
            {
                resave : true,
                saveUninitialized : true,
                secret: Config.crypto,
                cookie : { maxAge: 1 * 30 * 1000 } // 30seg
            })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


app.use(passwordless.acceptToken({ successRedirect: '/'}));


/*
    _    ____ ___       _
   / \  |  _ \_ _|   __| | ___   ___
  / _ \ | |_) | |   / _` |/ _ \ / __|
 / ___ \|  __/| |  | (_| | (_) | (__
/_/   \_\_|  |___|  \__,_|\___/ \___|
***********************************************************************/

var swagger = require('./rest/api/swagger')(app,baseurl,basecontact);

// #!/bin/env node
// app.get('/', routes.index);
// app.get('/dashboard', routes.dashboard);

// var products = require('./routes/products');

/*
 ____             _
|  _ \ ___  _   _| |_ ___ _ __
| |_) / _ \| | | | __/ _ \ '__|
|  _ < (_) | |_| | ||  __/ |
|_| \_\___/ \__,_|\__\___|_|
***********************************************************************/

router.init(app, models);

/*
 ____  _             _                                    _
/ ___|| |_ __ _ _ __| |_   ___  ___ _ ____   _____ _ __  | |
\___ \| __/ _` | '__| __| / __|/ _ \ '__\ \ / / _ \ '__| | |
 ___) | || (_| | |  | |_  \__ \  __/ |   \ V /  __/ |    |_|
|____/ \__\__,_|_|   \__| |___/\___|_|    \_/ \___|_|    (_)
***********************************************************************/

http.createServer(app).listen(port, ip, function(){
  console.log('Pliik server listening on port ' + ip + ':' + port + ' - Powered by EXPRESS 4!');
});
