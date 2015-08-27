module.exports = function(app,baseurl,basecontact) {



	// Set the main handler in swagger to the express app
	var swagger = require("swagger-node-express/lib/swagger");

	swagger.setAppHandler(app);

	// Add models and methods to swagger
	var models = require('./models');

	var catalogResources = require("./route_catalog");
	var geoResources = require("./route_geo");
	// var imagesResources = require("./route_images");
	var userResources = require("./route_user");

/*
 _ _   _ __ ___  _   _| |_ ___  ___
(_|_) | '__/ _ \| | | | __/ _ \/ __|
 _ _  | | | (_) | |_| | ||  __/\__ \
(_|_) |_|  \___/ \__,_|\__\___||___/

*/
	swagger.addModels(models)

		// Auth EndPoints
		.addPost(userResources.getTokenByMail)
		.addPost(userResources.revokeToken)

		// Catalog EndPoints
		.addGet(catalogResources.readChildren)
		.addGet(catalogResources.readNode)
		.addPost(catalogResources.addNode)
		.addPut(catalogResources.updateNode)
        .addPut(catalogResources.cloneNode)
		.addDelete(catalogResources.deleteNode)
		.addDelete(catalogResources.deleteCascadeNode)

		// Geo EndPoints
		/*
		.addPost(geoResources.nearGeo)
		.addPost(geoResources.addGeo)
		.addGet(geoResources.getGeo)
		.addPut(geoResources.updateGeo)
		.addDelete(geoResources.deleteGeo)
		*/


		// Image EndPoints

		/*
		.addGet(imagesResources.createPath)
		.addGet(imagesResources.getImages)
		.addPost(imagesResources.addImage)
		.addPost(imagesResources.removeImage)
		*/
		;

	swagger.configureDeclaration("user", {
	  description : "REST Api for Authentication processing.",
	  // authorizations : ["oauth2"],
	  produces: ["application/json"]
	});

	swagger.configureDeclaration("catalog", {
	  description : "REST Api for Catalog processing.",
	  // authorizations : ["oauth2"],
	  produces: ["application/json"]
	});

	swagger.configureDeclaration("geo", {
	  description : "REST Api for Geolocation processing.",
	  // authorizations : ["oauth2"],
	  produces: ["application/json"]
	});

	swagger.configureDeclaration("images", {
	  description : "REST Api for Image processing.",
	  // authorizations : ["oauth2"],
	  produces: ["application/json"]
	});

	// set api info
	swagger.setApiInfo({
	  title: baseurl,
	  description: "REST public API documentation.",
	  termsOfServiceUrl: baseurl + "/terms",
	  contact: basecontact,
	  license: "MIT",
	  licenseUrl: "https://github.com/pliik/gugamarket"
	});

	/*
	swagger.setAuthorizations({
	  apiKey: {
	    type: "apiKey",
	    passAs: "header"
	  }
	});
	*/


	// Configures the app's base path and api version.
	swagger.configureSwaggerPaths("", "api-docs", "");

	swagger.configure(baseurl, "1.0.0");

	return swagger;

}
