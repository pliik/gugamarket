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
var userController = require('./controller/User');
var passwordless = require('passwordless');
var email = require("emailjs");
var Config = require('./config/main.js');
var app = express();
var MongoStore = require('passwordless-mongostore-openshift');

var basecontact = Config.basecontact;
var baseurl = Config.baseurl;
var ip = Config.ip;
var port = Config.port;
var dbPath = Config.dbPath;
var yourPwd = Config.yourPwd;
var yourSmtp = Config.yourSmtp;
var yourEmail = Config.yourEmail;
var yourSSL = Config.yourSSL;
var env = 'development'

if ( 'development' != process.env.NODE_ENV ) {
    env = process.env.NODE_ENV
}

/*
  ____ ___  ____  ____
 / ___/ _ \|  _ \/ ___|
| |  | | | | |_) \___ \
| |__| |_| |  _ < ___) |
 \____\___/|_| \_\____/
***********************************************************************/
// ACTIVATE CORS FOR ALL DOMAINS
var cors = require('cors');
app.use(cors(/* corsOptions */));

// Set up a delivery service
var smtpServer = email.server.connect({
   user:      yourEmail,
   password:  yourPwd,
   host:      yourSmtp,
   ssl:       yourSSL
});

/*
                     _
 _ __   __ _ ___ ___| | ___  ___ ___
| '_ \ / _` / __/ __| |/ _ \/ __/ __|
| |_) | (_| \__ \__ \ |  __/\__ \__ \
| .__/ \__,_|___/___/_|\___||___/___/
|_|
***********************************************************************/
var passLessController = require('./controller/PassLess')
passLessController.init(yourEmail,passwordless,smtpServer,MongoStore,dbPath);
app.locals.passwordless = passwordless;

var options = {};
if ( 'development' == process.env.NODE_ENV ) {
 	app.use(errorHandler());
}

/*
 __  __
|  \/  | ___  _ __   __ _  ___   ___  ___  ___
| |\/| |/ _ \| '_ \ / _` |/ _ \ / _ \/ __|/ _ \
| |  | | (_) | | | | (_| | (_) | (_) \__ \  __/
|_|  |_|\___/|_| |_|\__, |\___/ \___/|___/\___|
                    |___/
***********************************************************************/
var mongoose = require('mongoose');

//db connection
mongoose.connect(dbPath, function onMongooseError(err) {
    if (err) throw err;
});

// import the data layer
var mongoose = require('mongoose');
var nestedSetPlugin = require('mongoose-nested-set');

// import the models
var models = {
    Catalog: require('./model/Catalog')(mongoose,this,nestedSetPlugin),
    User: require('./model/User')(mongoose)
};

// +-----------------------------------
// all environments
// +-----------------------------------
app.set('port', port);
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
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
