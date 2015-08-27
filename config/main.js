var Config = {

  market : 'Gugamarket',

  desc : 'Open App Market API',

  crypto : 'secretxptz',

  prd : {

    basecontact : "xptz",
    baseurl : "xptz",
    ip : process.env.OPENSHIFT_NODEJS_IP,
    port : process.env.OPENSHIFT_NODEJS_PORT,
    dbPath : 'mongodb://'+
                  process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
                  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
                  process.env.OPENSHIFT_MONGODB_DB_HOST     + ':' +
                  process.env.OPENSHIFT_MONGODB_DB_PORT     + '/xptz',

    yourPwd : 'xptz',
    yourSmtp :  'xptz',
    yourEmail :  'xptz',
    yourSSL : false

  },

  dev : {

    basecontact : "noreply@localhost",
    ip : '127.0.0.1',
    baseurl : 'http://127.0.0.1:3000',
    port : 3000,
    dbPath : 'mongodb://127.0.0.1:27017/gmbd',
    // To use gmail please activate less secure apps
    // https://www.google.com/settings/security/lesssecureapps
    yourPwd : 'mypassword',
    yourSmtp :  'smtp.gmail.com',
    yourEmail :  'myaccount@gmail.com',
    yourSSL : true

  }

}


module.exports = Config;
