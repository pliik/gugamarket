var sw = require("swagger-node-express/lib/swagger");
var param = require("swagger-node-express/lib/paramTypes.js");
var url = require("url");
var swe = sw.errors;

var GeoController = require("../../controller/Geo.js");

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
exports.getGeo = {
  'spec': {
    description : "Operations about geo",
    path : "/geo/{catalog}",
    method: "GET",
    summary : "Return by catalog ID",
    notes : 'Returns all geo by catalog ID.',
    type : "Geo",
    nickname : "getGeo",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          {
            "paramType": "path",
            "name": "catalog",
            "description": 'Catalog ID.',
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

    GeoController.get(req,res);
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

/*
           _     _ 
  __ _  __| | __| |
 / _` |/ _` |/ _` |
| (_| | (_| | (_| |
 \__,_|\__,_|\__,_|           
**********************************************************************************/
// the description will be picked up in the resource listing
exports.addGeo = {
  'spec': {
    description : "Operations about geo.",
    path : "/geo/add",
    method: "POST",
    summary : "Add geo",
    notes : 'Adds a geo and returns the geo just added.',
    type : "Geo",
    nickname : "addGeo",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          {
            "paramType": "query",
            "name": "catalog",
            "description": 'Catalog ID.',
            "dataType": "string",
            "defaultValue" : '',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },
          {
            "paramType": "query",
            "name": "latitude",
            "description": 'Geo latitude coordinate.',
            "dataType": "number",
            "defaultValue" : '',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },
          {
            "paramType": "query",
            "name": "longitude",
            "description": 'Geo longitude coordinate.',
            "dataType": "number",
            "defaultValue" : '',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },{
            "paramType": "query",
            "name": "index",
            "description": 'Geo index.',
            "dataType": "number",
            "defaultValue" : '',
            "format": "",
            "required": false,
            "minimum": false,
            "maximum": false
          }
        ]/*,
    responseMessages : [swe.invalid('id'), swe.notFound('pet')]*/
  },
  'action': function (req,res) {

    GeoController.add(req,res);
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

/*
                 _       _       
 _   _ _ __   __| | __ _| |_ ___ 
| | | | '_ \ / _` |/ _` | __/ _ \
| |_| | |_) | (_| | (_| | ||  __/
 \__,_| .__/ \__,_|\__,_|\__\___|
      |_| 
**********************************************************************************/
// the description will be picked up in the resource listing
exports.updateGeo = {
  'spec': {
    description : "Operations about geo.",
    path : "/geo/update",
    method: "PUT",
    summary : "Update by ID",
    notes : 'Update a geo and returns the geo just updated.',
    type : "Geo",
    nickname : "updateGeo",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          {
            "paramType": "query",
            "name": "geo",
            "description": 'Geo ID.',
            "dataType": "string",
            "defaultValue" : '',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },
          {
            "paramType": "query",
            "name": "latitude",
            "description": 'Geo latitude coordinate.',
            "dataType": "float",
            "defaultValue" : '',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },
          {
            "paramType": "query",
            "name": "longitude",
            "description": 'Geo longitude coordinate.',
            "dataType": "float",
            "defaultValue" : '',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },{
            "paramType": "query",
            "name": "index",
            "description": 'Geo index.',
            "dataType": "integer",
            "defaultValue" : '',
            "format": "",
            "required": false,
            "minimum": false,
            "maximum": false
          }
        ]/*,
    responseMessages : [swe.invalid('id'), swe.notFound('pet')]*/
  },
  'action': function (req,res) {

    GeoController.update(req,res);
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


/*
     _      _      _       
  __| | ___| | ___| |_ ___ 
 / _` |/ _ \ |/ _ \ __/ _ \
| (_| |  __/ |  __/ ||  __/
 \__,_|\___|_|\___|\__\___|
  
**********************************************************************************/
// the description will be picked up in the resource listing
exports.deleteGeo = {
  'spec': {
    description : "Operations about geo.",
    path : "/geo/delete/{id}",
    method: "DELETE",
    summary : "Delete by ID",
    notes : 'Delete a geo by ID.</br>'+
            'Returns deleted geo.',
    type : "Geo",
    nickname : "deleteGeo",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          {
            "paramType": "path",
            "name": "id",
            "description": 'Geo ID to destroy.',
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

    GeoController.delete(req,res);
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


/*
 _ __   ___  __ _ _ __ 
| '_ \ / _ \/ _` | '__|
| | | |  __/ (_| | |   
|_| |_|\___|\__,_|_|   
  
*/
exports.nearGeo = {
  'spec': {
    description : "Operations about geo.",
    path : "/geo/near",
    method: "POST",
    summary : "Get near catalogs",
    notes : 'Return near catalogs in relation to a given point.',
    type : "Geo",
    nickname : "nearGeo",
    produces : ["application/json"],
    parameters : [
          {
            "paramType": "query",
            "name": "latitude",
            "description": 'Reference geo latitude coordinate.',
            "dataType": "float",
            "defaultValue" : '38.706931999999990000',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },
          {
            "paramType": "query",
            "name": "longitude",
            "description": 'Reference geo longitude coordinate.',
            "dataType": "float",
            "defaultValue" : '-9.135632100000066000',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },{
            "paramType": "query",
            "name": "limit",
            "description": 'Number of results',
            "dataType": "integer",
            "defaultValue" : '100',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          }
        ]/*,
    responseMessages : [swe.invalid('id'), swe.notFound('pet')]*/
  },
  'action': function (req,res) {

    GeoController.near(req,res);
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