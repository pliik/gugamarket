var sw = require("swagger-node-express/lib/swagger");
var param = require("swagger-node-express/lib/paramTypes.js");
var url = require("url");
var swe = sw.errors;

var CatalogController = require("../../controller/Catalog.js");

var UserController = require('../../controller/User');

/*
function writeResponse (res, data) {
sw.setHeaders(res);
  res.send(JSON.stringify(data));
}*/

/*
           _        _                __   _     _ _     _                
  ___ __ _| |_ __ _| | ___   __ _   / /__| |__ (_) | __| |_ __ ___ _ __  
 / __/ _` | __/ _` | |/ _ \ / _` | / / __| '_ \| | |/ _` | '__/ _ \ '_ \ 
| (_| (_| | || (_| | | (_) | (_| |/ / (__| | | | | | (_| | | |  __/ | | |
 \___\__,_|\__\__,_|_|\___/ \__, /_/ \___|_| |_|_|_|\__,_|_|  \___|_| |_|
                            |___/  
**********************************************************************************/
// the description will be picked up in the resource listing
exports.readChildren = {
  'spec': {
    description : "Operations about catalogs.",
    path : "/catalog/children",
    method: "GET",
    summary : "Return children by ID",
    notes : 'Returns immediate children based on ID.</br>Use "root" as node value to retrieve first level root nodes!',
    type : "Catalog",
    nickname : "getChildren",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          {
            "paramType": "query",
            "name": "node",
            "description": 'ID of parent node ("root" retrieves all root nodes).',
            "dataType": "string",
            "defaultValue" : 'root',
            "format": "",
            "required": false,
            "minimum": false,
            "maximum": false
          },
          {
            "paramType": "query",
            "name": "token",
            "description": 'Access Token.',
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

    UserController.getSwaggerToken(
        req
        ,res
        ,CatalogController.read.tree
    );

    // CatalogController.read.tree(req,res);
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
           _        _                __ _     _ 
  ___ __ _| |_ __ _| | ___   __ _   / /(_) __| |
 / __/ _` | __/ _` | |/ _ \ / _` | / (_) |/ _` |
| (_| (_| | || (_| | | (_) | (_| |/ / _| | (_| |
 \___\__,_|\__\__,_|_|\___/ \__, /_/ (_)_|\__,_|
                            |___/   
**********************************************************************************/
// the description will be picked up in the resource listing
exports.readNode = {
  'spec': {
    description : "Operations about catalogs.",
    path : "/catalog/{id}",
    method: "GET",
    summary : "Return by ID",
    notes : 'Returns a node by ID.',
    type : "Catalog",
    nickname : "getNode",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          {
            "paramType": "path",
            "name": "id",
            "description": 'Node ID.',
            "dataType": "string",
            "defaultValue" : '',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },
          {
            "paramType": "query",
            "name": "token",
            "description": 'Access Token.',
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

    // CatalogController.read.list(req,res);

    UserController.getSwaggerToken(
        req
        ,res
        ,CatalogController.read.list
    );  

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
           _        _                __        _     _ 
  ___ __ _| |_ __ _| | ___   __ _   / /_ _  __| | __| |
 / __/ _` | __/ _` | |/ _ \ / _` | / / _` |/ _` |/ _` |
| (_| (_| | || (_| | | (_) | (_| |/ / (_| | (_| | (_| |
 \___\__,_|\__\__,_|_|\___/ \__, /_/ \__,_|\__,_|\__,_|
                            |___/                      
**********************************************************************************/
// the description will be picked up in the resource listing
exports.addNode = {
  'spec': {
    description : "Operations about catalogs.",
    path : "/catalog/add",
    method: "POST",
    summary : "Add catalog",
    notes : 'Adds a node and returns the node just added.</br>'+
            'It accepts an object containing model properties.</br>'+
            'To create a first level node set <b>parentId</b> to "root" or to "".',
    type : "Catalog",
    nickname : "addNode",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          {
            "paramType": "body",
            "name": "New node object",
            "description": 'New node object based on node model.</br>'+
                            'To create a first level node set <b>parentId</b> to "root" or to "".',
            "dataType": "object",
            "defaultValue" : '{'+'\n'+
                             '"name":"name",'+'\n'+
                             '"description":"description",'+'\n'+
                             '"parentId":""'+'\n'+
                             '}',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },
          {
            "paramType": "query",
            "name": "token",
            "description": 'Access Token.',
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

    UserController.getSwaggerToken(
        req
        ,res
        ,CatalogController.add
    );
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
           _        _                __               _       _       
  ___ __ _| |_ __ _| | ___   __ _   / /   _ _ __   __| | __ _| |_ ___ 
 / __/ _` | __/ _` | |/ _ \ / _` | / / | | | '_ \ / _` |/ _` | __/ _ \
| (_| (_| | || (_| | | (_) | (_| |/ /| |_| | |_) | (_| | (_| | ||  __/
 \___\__,_|\__\__,_|_|\___/ \__, /_/  \__,_| .__/ \__,_|\__,_|\__\___|
                            |___/          |_|                        
**********************************************************************************/
// the description will be picked up in the resource listing
exports.updateNode = {
  'spec': {
    description : "Operations about catalogs.",
    path : "/catalog/update",
    method: "PUT",
    summary : "Update by ID",
    notes : 'Update a node and returns the node just added.</br>'+
            'It accepts an object containing model properties.</br>'+
            'It matches the node by the property "_id".',
    type : "Catalog",
    nickname : "updateNode",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          {
            "paramType": "body",
            "name": "Update node object",
            "description": 'Update node object based on node model.</br>'+
                            'It matches the node by the property "_id".',
            "dataType": "object",
            "defaultValue" : '{"_id":"Node ID","name":"My node name","description":"My node description"}',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },
          {
            "paramType": "query",
            "name": "token",
            "description": 'Access Token.',
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

    // CatalogController.update(req,res);

    UserController.getSwaggerToken(
        req
        ,res
        ,CatalogController.update
    );    
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
           _        _                __  _      _      _       
  ___ __ _| |_ __ _| | ___   __ _   / /_| | ___| | ___| |_ ___ 
 / __/ _` | __/ _` | |/ _ \ / _` | / / _` |/ _ \ |/ _ \ __/ _ \
| (_| (_| | || (_| | | (_) | (_| |/ / (_| |  __/ |  __/ ||  __/
 \___\__,_|\__\__,_|_|\___/ \__, /_/ \__,_|\___|_|\___|\__\___|
                            |___/  
**********************************************************************************/
// the description will be picked up in the resource listing
exports.deleteNode = {
  'spec': {
    description : "Operations about catalogs.",
    path : "/catalog/delete",
    method: "GET",
    summary : "Delete by ID",
    notes : 'Delete a node by ID.</br>'+
            'Returns deleted node.</br>'+
            '<b>It is not a cascade delete.</b></br>'+
            'For cascade delete use catalog/delete/{id}',
    type : "Catalog",
    nickname : "deleteNode",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          {
            "paramType": "query",
            "name": "_id",
            "description": 'Node ID to destroy.',
            "dataType": "string",
            "defaultValue" : '',
            "format": "",
            "required": false,
            "minimum": false,
            "maximum": false
          },
          {
            "paramType": "query",
            "name": "token",
            "description": 'Access Token.',
            "dataType": "string",
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

    // CatalogController.destroy.node(req,res);

    // res.send('sds');
    
    UserController.getSwaggerToken(
        req
        ,res
        ,CatalogController.delete
    );

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
           _        _                __  _      _      _       
  ___ __ _| |_ __ _| | ___   __ _   / /_| | ___| | ___| |_ ___ 
 / __/ _` | __/ _` | |/ _ \ / _` | / / _` |/ _ \ |/ _ \ __/ _ \
| (_| (_| | || (_| | | (_) | (_| |/ / (_| |  __/ |  __/ ||  __/
 \___\__,_|\__\__,_|_|\___/ \__, /_/ \__,_|\___|_|\___|\__\___|
                            |___/  
**********************************************************************************/
// the description will be picked up in the resource listing
exports.deleteCascadeNode = {
  'spec': {
    description : "Operations about catalogs.",
    path : "/catalog/delete-cascade/{id}",
    method: "DELETE",
    summary : "Cascade delete by ID",
    notes : 'Deletes a node and all node children.</br>'+
            'Returns deleted node.',
    type : "Catalog",
    nickname : "deleteCascadeNode",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          {
            "paramType": "path",
            "name": "id",
            "description": 'Node ID to cascade destroy.',
            "dataType": "string",
            "defaultValue" : '',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },
          {
            "paramType": "query",
            "name": "token",
            "description": 'Access Token.',
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

    // CatalogController.destroy.cascade(req,res);
return;
    UserController.getSwaggerToken(
        req
        ,res
        ,CatalogController.destroy.cascade
    );

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
           _        _                __   _                  
  ___ __ _| |_ __ _| | ___   __ _   / /__| | ___  _ __   ___ 
 / __/ _` | __/ _` | |/ _ \ / _` | / / __| |/ _ \| '_ \ / _ \
| (_| (_| | || (_| | | (_) | (_| |/ / (__| | (_) | | | |  __/
 \___\__,_|\__\__,_|_|\___/ \__, /_/ \___|_|\___/|_| |_|\___|
                            |___/                            
**********************************************************************************/
// the description will be picked up in the resource listing
exports.cloneNode = {
  'spec': {
    description : "Operations about catalogs.",
    path : "/catalog/clone/{id}",
    method: "PUT",
    summary : "Tree node clone by ID",
    notes : 'Clones a node and all node children.</br>'+
            'Returns cloned node.',
    type : "Catalog",
    nickname : "cloneNode",
    produces : ["application/json"],
    parameters : [
          //name, description, type, required, allowableValuesEnum, defaultValue
          {
            "paramType": "path",
            "name": "id",
            "description": 'Node ID to clone.',
            "dataType": "string",
            "defaultValue" : '',
            "format": "",
            "required": true,
            "minimum": false,
            "maximum": false
          },
          {
            "paramType": "query",
            "name": "token",
            "description": 'Access Token.',
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

    //CatalogController.clone.node(req,res);


    UserController.getSwaggerToken(
        req
        ,res
        ,CatalogController.clone.node
    );

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