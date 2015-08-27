var userController = require('../controller/User');
var url=require('url');


exports.init = function(yourEmail,passwordless,smtpServer,MongoStore,dbPath){

passwordless.init(new MongoStore(dbPath));
passwordless.addDelivery(

    function(tokenToSend, uidToSend, recipient, origin, callback) {
        // Send out token

       console.log('controller passless: sending email...');

        var host = origin;
        var now = new Date();

        var hostname = url.parse('http://'+host).hostname;
        var capitalized = hostname.charAt(0).toUpperCase() + hostname.slice(1).toLowerCase();

        smtpServer.send({
            text :
                'Welcome to '+capitalized+','
                + '\n'
                + '\n'
                + 'Your token grant period is set to 12 months.'
                + '\n'
                + '\n'
                + 'Domain: http://' +  hostname.toLowerCase()
                + '\n'
                + 'User: ' + uidToSend
                + '\n'
                + '\n'
                + 'Enter: http://' + host + '?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend)
                + '\n'
                + '\n'
                + 'Revoke: http://' + host + '?token=' + tokenToSend + '&revoke=true'
                + '\n'
                + '\n'
                + '\n'
                + '\n'
                + 'Always good to see you @ '+capitalized+' chief.',
           from:    capitalized + ' <' + yourEmail + '>',
           to:      recipient,
           subject: capitalized + ' access token!'
        }, function(err, message) {
            if(err) {
                console.log(err);
            }
            userController.validateEmailUser(tokenToSend,uidToSend);
            callback(err);
        });
    });
}
