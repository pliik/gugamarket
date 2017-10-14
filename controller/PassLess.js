var userController = require('../controller/User');
var url=require('url');
var Config   = require('../config/main.js');


exports.init = function(yourEmail,passwordless,smtpServer,MongoStore,dbPath){

passwordless.init(new MongoStore(dbPath));
passwordless.addDelivery(

    function(tokenToSend, uidToSend, recipient, origin, callback) {
        // Send out token


        if(origin==='gigya') {

            console.log('controller passless: sending gigya...');
            userController.handleCreateTokenGigya('gigya',tokenToSend,uidToSend,callback);
            return;

        } else {

            console.log('controller passless: sending email...');

        }


        var host = origin;
        var now = new Date();
        var protocol = 'https://';

        var hostname = url.parse( protocol + host ).hostname;
        var capitalized = hostname.charAt(0).toUpperCase() + hostname.slice(1).toLowerCase();

        var msg = 'Welcome to ' + capitalized + ','
        + '\n'
        + '\n'
        + 'Login: ' + protocol + host.toLowerCase() + '/#/token/' + encodeURIComponent(tokenToSend)
        + '\n'
        + '\n'
        + '\n'
        + capitalized + ' is powered by ' + Config.market + ' Open Source REST API'
        + '\n'
        + 'Revoke Token: ' + Config.url + '/user/revokeToken/' + encodeURIComponent(tokenToSend)
        + '\n';

        smtpServer.send({
          /*attachment:
            [
               {data:"<html>" + msg + "</html>", alternative:true}
            ],*/
            text : msg,
           from:    capitalized + ' <' + yourEmail + '>',
           to:      recipient,
           subject: capitalized + ' access token!'
        }, function(err, message) {
            if(err) {
                console.log(err);
            }
            userController.createToken('email',tokenToSend,uidToSend,callback);
            // callback(err);
        });
    });
}
