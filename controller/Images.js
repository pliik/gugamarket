require('./../config/meocloud.js');
var OAuth = require('oauth').OAuth;
var MeoCloud = require('NodeCloudPT-master/NodeCloudPT');

var meocloud = new MeoCloud({
    oauth : {
        consumer_key    : oauth_key,
        consumer_secret : oauth_secret,
        token           : oauth_access_token,
        token_secret    : oauth_token_secret
    }
});

oAuth = new OAuth(
  meocloud_conf.oauth.request_token_endpoint,
  meocloud_conf.oauth.access_token_endpoint,
  oauth_key,
  oauth_secret,
  "1.0",
  "oob",
  "HMAC-SHA1"
);

var MimeTypeExtension = {
'image/bmp'					: 'bmp' ,
'image/cis-cod'				: 'cod' ,
'image/gif'					: 'gif' ,
'image/ief'					: 'ief' ,
'image/jpeg'				: 'jpg' ,
'image/pipeg'				: 'jfif',
'image/svg+xml'				: 'svg' ,
'image/tiff'				: 'tif' ,
'image/x-cmu-raster'		: 'ras' ,
'image/x-cmx'				: 'cmx' ,
'image/x-icon'				: 'ico' ,
'image/x-portable-anymap'	: 'pnm' ,
'image/x-portable-bitmap'	: 'pbm' ,
'image/x-portable-graymap'	: 'pgm' ,
'image/x-portable-pixmap'	: 'ppm' ,
'image/x-rgb'				: 'rgb' ,
'image/x-xbitmap'			: 'xbm' ,
'image/x-xpixmap'			: 'xpm' ,
'image/x-xwindowdump'		: 'xwd'
}

/*
 _____ _   _ _   _  ____ _____ ___ ___  _   _ ____  
|  ___| | | | \ | |/ ___|_   _|_ _/ _ \| \ | / ___| 
| |_  | | | |  \| | |     | |  | | | | |  \| \___ \ 
|  _| | |_| | |\  | |___  | |  | | |_| | |\  |___) |
|_|    \___/|_| \_|\____| |_| |___\___/|_| \_|____/ 

*/

var clearArrayEmptys =  function ( anArray ) {
	for (var i = 0, len = anArray.length; i < len; i++) { if (anArray[i] == "") anArray.splice(i,1); }
	return anArray;
}

var getImageExtensionByMimeType = function (mimeType) { return MimeTypeExtension[mimeType]; };

var validateBase64DataURI = function(dataURI) {
	var data = {};
	var dataURIArray = dataURI.split(",");
	if (dataURIArray.length != 2) return null;
	data.data = dataURIArray[1];
	dataURIArray = dataURIArray[0].split(";");
	if (dataURIArray.length != 2) return null;
	data.encoding = dataURIArray[1];
	if (data.encoding != 'base64') return null;
	dataURIArray = dataURIArray[0].split(":");
	if (dataURIArray.length != 2) return null;
	if (dataURIArray[0] != 'data') return null;
	data.mimetype = dataURIArray[1];
	data.extension = getImageExtensionByMimeType(data.mimetype);
	return data;
};

var checkPath = function ( path, callback ) {
	var isPathValid = "false";
	meocloud.metadata({path:path, list:false}, function(data) {
		if (data != "") {
			data = JSON.parse(data);
			if (data["is_deleted"] != true) { callback(); } else { callback("Not available!"); }
		} else {
			callback("Not available!");
		}
	});
}

var createFolder = function ( path , callback ) {
	oAuth.post(
	  	meocloud_conf.api.endpoint+meocloud_conf.api.storage+"/Fileops/CreateFolder",
	  	oauth_access_token,
	  	oauth_token_secret,
	  	{ 'root':meocloud_conf.api.root, 'path':path },
	  	function(error, data) { if(!error) { callback(); } else { console.log(require('sys').inspect(error)); callback(error); }}
	);
}

var createPath = function ( path , callback ) {
	checkPath(path,function(error){
		if(!error) {
			callback();
		} else {
			var pathArray = clearArrayEmptys(path.split("/"));
			pathArray.pop();
			var parentPath = (pathArray.length > 0) ? "/"+pathArray.join("/") : "";
			if (parentPath == "") {
				createFolder(path, function(error){ callback(error); });
			} else {
				checkPath(parentPath, function(error){
					if(!error) {
						createFolder(path, function(error){ callback(error); });
					} else {
						createPath(parentPath, function(error){
							if(!error) { createFolder(path, function(error){ callback(error); }); } else { callback(error); }
						});
					}
				});
			}
		}
	});
};

/*
 __  __ _____ _____ _   _  ___  ____  ____  
|  \/  | ____|_   _| | | |/ _ \|  _ \/ ___| 
| |\/| |  _|   | | | |_| | | | | | | \___ \ 
| |  | | |___  | | |  _  | |_| | |_| |___) |
|_|  |_|_____| |_| |_| |_|\___/|____/|____/ 
*/

exports.checkPath = function ( req, res ) {
	var path = req.query.path;
	checkPath( path, function(error){
		if(!error) {
			res.send({success: true, path : path});
		} else {
			console.log(require('sys').inspect(error));
			res.send({ success: false, message: "Failed to check path!" , error: require('sys').inspect(error) });
		}
	});
}

exports.createPath = function ( req, res ) {
	var path = req.query.path;
	createPath( path, function(error){
		if(!error) {
			res.send({success: true, path : path});
		} else {
			console.log(require('sys').inspect(error));
			res.send({ success: false, message: "Failed to create path!" , error: require('sys').inspect(error) });
		}
	});
}

exports.get = function (req, res) {
	
	var catalogID = req.query.catalog, skip = req.query.skip || 0, limit = req.query.limit || null;
	exports.model.Images.find({'catalog':catalogID},null,{skip: skip, limit: limit, sort:{index:1}}, function(error, records){
		if(!error && records.length > 1) {
			res.send({success: true, Images : records});
		} else {
			console.log(require('sys').inspect(error));
			res.send({ success: false, message: "No images found!." , data: req.query });
		}
	});

}

exports.add = function (req, res) {

	var params = {};

	params.catalog = req.body.catalog;
	params.dataURI = req.body.dataURI;

	exports.model.Images.findOne({ 'catalog' : params.catalog }).sort('-index').exec( function(error, doc) {

		// Set next index (always last plus one)
		params.index = (doc) ? doc.index+1 : 1;

		// Validate DataURI
		filedata = validateBase64DataURI(params.dataURI);

		if (!filedata) {

            res.send({success: false, message: "Invalid DataURI!", data: params.dataURI});

        } else {

        	params.pathname = meocloud_images_folder+"/"+params.catalog+"_"+params.index+"."+filedata.extension;

        	// If path don't exists, create it
        	var pathArray = clearArrayEmptys(params.pathname.split("/"));
        	pathArray.pop();
        	var path = "/"+pathArray.join("/");

        	createPath( path, function(error){
				if(!error) {
					// Create MeoCloud image
		            meocloud.uploadBase64({path:params.pathname, fileData: filedata.data.toString()}, function(uploaddata) {
		            	// Convert response string to JSON
					    uploaddata = JSON.parse(uploaddata);
					    if (uploaddata.error != null) {
					    	var message = "";
					    	switch(uploaddata.error) {
					    		case 0 : message = "File already exists!"; break;
					    		default: message = "File upload failed!";
					    	}
					    	res.send({ success: false, message: message , data: uploaddata });
					    } else {
					    	// Generate shared link and return download link
					    	meocloud.shares({path:params.pathname}, function(sharesdata) {
							    sharesdata = JSON.parse(sharesdata);
							    params.publicUrl = sharesdata.url.substring(0,sharesdata.url.length-1);
							    params.publicUrl = params.publicUrl.replace("meocloud.pt/link","cld.pt/dl/download")+"?download=true";

							    // Create DB image item
								item = new exports.model.Images(params);
							    item.save(function(error,record) {
							        if (!error) {
							            res.send({success: true, Image: record});
							        } else {
							        	console.log(require('sys').inspect(error));
							            res.send({success: false, Images: item, message: error.message, detail: error});
							        }
							    });
							});
					    }
					});
				} else {
					console.log(require('sys').inspect(error));
					res.send({ success: false, message: "Failed to create path!" , error: require('sys').inspect(error) });
				}
			});
        }
	});
}

exports.remove = function (req, res) {
	console.log("controller.image.remove");
	var catalogID = req.body.catalog;
	var index     = req.body.index;
	var item;
	exports.model.Images.findOne({'catalog':catalogID,'index':index}).exec(function(error, record){
		if(!error && record) {
			item = exports.model.Images(record);
			oAuth.post(
			  	meocloud_conf.api.endpoint+meocloud_conf.api.storage+"/Fileops/Delete",
			  	oauth_access_token,
			  	oauth_token_secret,
			  	{
			  		'root':meocloud_conf.api.root,
			   	 	'path':item.pathname
			   	},
			  	function(error, data) {
				    if(error) {
			    		console.log(require('sys').inspect(error));
			    		res.send({ success: false, message: "File deletion failed! Failed to remove from MeoCloud." , error: error });
			    	} else {
			    		item.remove(function(error, record){
				    		if(!error) {
								res.send({ success: true, message: "File deleted successfully." , data: record });
			    			} else {
			    				console.log(require('sys').inspect(error));
								res.send({ success: false, message: "File deletion failed! Failed to remove from DB." , error: error });
			    			}
						});
			    	}
			  	}
			);
		} else {
			res.send({ success: false, message: "Image not found!" , data: req.body });
		}
	});
}