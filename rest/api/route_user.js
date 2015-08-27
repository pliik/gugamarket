var sw = require("swagger-node-express/lib/swagger");
var param = require("swagger-node-express/lib/paramTypes.js");
var url = require("url");
var swe = sw.errors;
var UserController = require("../../controller/User.js");

// var GeoController = require("../../controller/Geo.js");

/*
function writeResponse (res, data) {
sw.setHeaders(res);
  res.send(JSON.stringify(data));
}*/

/*
                    _
 _ __ ___  __ _  __| |
| '__/ _ \/ _` |/ _` |
| | |  __/ (_| | (_| |
|_|  \___|\__,_|\__,_|
**********************************************************************************/
// the description will be picked up in the resource listing
exports.getTokenByMail = {
  'spec': {
    description : "Operations about user",
    path : "/user/getTokenByMail",
    method: "POST",
    summary : "Request a authorization access token to Gugamarket API to be sent by mail.",
    notes : 'Sends to the requesting email a authentication Url for the responsible App.<br><br>' +
      'Example: <b>http://{origin}?token=<i>secret</i>&uid={user}</b><br><br>'+
      'The token automaticaly expires after 24h.',
    type : "user",
    nickname : "getTokenByMail",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          {
            "paramType": "form",
            "name": "user",
            "description": 'User email',
            "dataType": "string",
            "defaultValue" : 'tester@gugamarket.com',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },
          {
            "paramType": "form",
            "name": "origin",
            "description": 'Application redirect domain (may include port eg:appdomain.com:8080)',
            "dataType": "string",
            "defaultValue" : 'appdomain.com',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          }
        ]/*,
    responseMessages : [swe.invalid('id'), swe.notFound('pet')]*/
  },
  'action': function (req,res) {

      // body: { user: 'xcvb', baseurl: 'dsfgs' },
      // console.log(req)

      // Simply accept every user
      var passLess = req.app.locals.passwordless.requestToken(
        // Simply accept every user

        function(user, delivery, callback) {


          console.log('--- Sending mail to ');


          callback(null, req.body.user);



        // usually you would want something like:
        // User.find({email: user}, callback(ret) {
        //    if(ret)
        //      callback(null, ret.id)
        //    else
        //      callback(null, null)
        // })
      },{ originField: 'origin' });

      passLess( req, res, function(err) {


        // res.render('sent');

      } );

    res.json(req.body); // no waiting look the loop

    // GeoController.get(req,res);
    /*
    if (!req.params.petId) {
      throw swe.invalid('id'); }
    var id = parseInt(req.params.petId);
    var pet = petData.getPetById(id);

    if(pet) res.send(JSON.stringify(pet));
    else throw swe.notFound('pet');
    */
  }
};

// the description will be picked up in the resource listing
exports.revokeToken = {
  'spec': {
    description : "Operations about user",
    path : "/user/revokeToken",
    method: "POST",
    summary : "Revoke access token.",
    notes : 'Revokes token.',
    type : "revoke",
    nickname : "revokeToken",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          /*{
            "paramType": "form",
            "name": "user",
            "description": 'User email',
            "dataType": "string",
            "defaultValue" : 'tester@gugamarket.com',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },*/
          {
            "paramType": "form",
            "name": "token",
            "description": 'Token to revoke',
            "dataType": "string",
            "defaultValue" : '',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          }
        ]/*,
    responseMessages : [swe.invalid('id'), swe.notFound('pet')]*/
  },
  'action': function (req,res) {


    UserController.revokeToken(/*req.body.user,*/req.body.token,res);

    // res.json(req.body);

    // GeoController.get(req,res);
    /*
    if (!req.params.petId) {
      throw swe.invalid('id'); }
    var id = parseInt(req.params.petId);
    var pet = petData.getPetById(id);

    if(pet) res.send(JSON.stringify(pet));
    else throw swe.notFound('pet');
    */
  }
};
