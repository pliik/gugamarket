var Config = {
  market        : 'Gugamarket',
  domain        : 'gugamarket.com',
  url           : process.env.BASE_URL || "'http://127.0.0.1:8080",
  desc          : 'NodeJS REST API',
  crypto        : process.env.CRYPTO || 'TheBiGsecret',
  basecontact   : "ceo@gugamarket.com",
  baseurl       : process.env.BASE_URL || "'http://127.0.0.1:8080",
  ip            : process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
  port          : process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  dbPath        : process.env.MONGO_URL,
  // To use gmail please activate less secure apps
  // https://www.google.com/settings/security/lesssecureapps
  yourPwd       : process.env.MAIL_PASS || 'mypassword',
  yourSmtp      : process.env.MAIL_HOST || 'smtp.gmail.com',
  yourEmail     : process.env.MAIL_EMAIL || 'myaccount@gmail.com',
  yourSSL       : false
}
module.exports = Config;
