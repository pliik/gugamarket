var Config = {
  market        : 'Gugamarket',
  desc          : 'NodeJS REST API',
  domain        : process.env.BASE_DOMAIN  || 'localhost',
  url           : process.env.BASE_URL     || "http://127.0.0.1:8080",
  crypto        : process.env.CRYPTO       || 'TheBiGsecret',
  basecontact   : process.env.BASE_CONTACT || "myaccount@gmailxyz.com",
  baseurl       : process.env.BASE_URL     || "http://127.0.0.1:8080",
  ip            : process.env.IP           || process.env.OPENSHIFT_NODEJS_IP   || '0.0.0.0',
  port          : process.env.PORT         || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  dbPath        : process.env.MONGO_URL    || 'mongodb://user:pass@host:port/bucket',
  
  // To use gmail please activate less secure apps - https://www.google.com/settings/security/lesssecureapps
  // Gmail less secure require yourSSL set to true.
  yourPwd       : process.env.MAIL_PASS  || 'mypassword',
  yourSmtp      : process.env.MAIL_HOST  || 'smtp.gmailxyz.com',
  yourEmail     : process.env.MAIL_EMAIL || 'myaccount@gmailxyz.com',
  yourSSL       : process.env.MAIL_SSL   || false
}
console.log(Config);
module.exports = Config;
