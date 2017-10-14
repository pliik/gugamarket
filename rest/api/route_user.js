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

exports.getTokenByGigya = {
  'spec': {
    description : "Operations about user",
    path : "/user/getTokenByGigya",
    method: "GET",
    summary : "Get Token by Gigya.",
    notes : 'Suport for www.gigya.com access via user UID.',
    type : "gigya",
    nickname : "getTokenByGigya",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          {
            "paramType": "query",
            "name": "uid",
            "description": 'Gigya end user UID',
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

      console.log('>>> START: /user/getTokenByGigya');

      req.body.user = req.query.uid;
      req.body.origin = 'gigya';
      // Simply accept every user
      var passLess = req.app.locals.passwordless.requestToken(


        function(user, delivery, callback) {

          callback(null, req.body.user);


      },{ originField: 'origin' });

      passLess( req, res, function(err,msg) {

        // console.log(arguments);
        // res.render('sent');
        console.log('>>> STOP: /user/getTokenByGigya');
        req.body=msg;//JSON.stringify(msg);
        res.json(req.body); // no waiting look the loop

      } );

    // res.json(req.body); // no waiting look the loop
    console.log('>>> RETURN: /user/getTokenByGigya');


  }
};


// the description will be picked up in the resource listing
exports.getTokenByMail = {
  'spec': {
    description : "Operations about user",
    path : "/user/getTokenByMail",
    method: "POST",
    summary : "Get Token by email.",
    notes : 'Sends to the requesting email a authentication Url for the responsible App.<br><br>' +
      'Example: <b>http://{origin}/#/token/<i>guid</i></b><br><br>'+
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

      console.log('>>> START: /user/getTokenByMail');

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
        console.log('>>> STOP: /user/getTokenByMail');

      } );

    res.json(req.body); // no waiting look the loop
    console.log('>>> RETURN: /user/getTokenByMail');

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
    path : "/user/revokeToken/{token}",
    method: "GET",
    summary : "Revoke Token.",
    notes : 'Revokes access token. If is a Gigya user logs out the user from Gigya.com',
    type : "Token",
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
            "paramType": "path",
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

    req.body.token = req.params.token;
    UserController.revokeToken(/*req.body.user,*/req.body.token,res);

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
