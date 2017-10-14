module.exports = {

  "Token" : {
    "id":"Token",
    "required":[/*"user",*/"token"],
    "properties":{
      /*"user":{
        "type":"string",
        "description": "User email account"
      },*/
      "token":{
        "type":"string",
        "description": "The revoked token guid."
      }
    }
  },

  "user" : {
    "id":"user",
    "required":["user","origin"],
    "properties":{
      "user":{
        "type":"string",
        "description": "User email account"
      },
      "origin":{
        "type":"string",
        "description": "Redirect application domain (can include port (ex. :8080)"
      }
    }
  },

  "gigya" : {
    "id":"token",
    "required":["uid"],
    "properties":{
      "uid":{
        "type":"string",
        "description": "Access Token to Gugamarket API"
      }
    }
  },
/*
  "Geo" : {
    "id":"Geo",
    "required":["pos"],
    "properties":{
      "_id":{
        "type":"string"
      },
      "index":{
        "type":"int",
        "description": "Order of current geo node"
      },
      "pos":{
        "type": "array",
        "uniqueItems": "true",
        "description": "GeoJson reference point"
      },
      "Catalog":{
        "type":"string",
        "description": "Id of catalog"
      }
    }
  },
*/
/*
       name: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        root: {
            type: Boolean
        },
        price: {
            type: Number,
            required: false,
            min: 0
        },
        index: {
            type: Number,
            required: false,
            default: 0,
            min: 0
        },
        leaf : {
            type: Boolean,
            required: true,
            default: true
        },
        parentId: String,
        userId: {
            type: String,
            required: true,
            default: ''
        },
        updated: {
            type: Date,
            default: Date.now
        }
*/
  "Catalog":{
    "id":"Catalog",
    "required": ["name", "leaf","userId"],
    "properties":{
      "_id":{
        "type":"string"
      },
      "name":{
        "type":"string",
        "description": "Name of the catalog"
      },
      "description":{
        "type":"string",
        "description": "Description of the catalog"
      },
      "price":{
        "type":"float",
        "description": "Price of current catalog node"
      },
      "index":{
        "type":"int",
        "description": "Order of current catalog node"
      },
      "parentId":{
        "type":"string",
        "description": "Id of parent catalog"
      },
      "userId":{
        "type":"string",
        "description": "Id of owner"
      },
      "root":{
        "type":"boolean",
        "description": "Root node flag"
      },
      "leaf":{
        "type":"boolean",
        "description": "Leaf node flag"
      },
      "updated":{
        "type":"date",
        "description": "Updated catalog date"
      }
    }
  },

  "Images":{
    "id":"Images",
    "required": ["catalog","pathname","index"],
    "properties":{
      "catalog": {
        "type":"string",
        "description":"Catalog _id"
      },
      /*
      "kind":{
        "type":"string",
        "description":"Type of image"
      },
      */
      "pathname":{
        "type":"string",
        "description":"Pathname in Pliik's MeoCloud account"
      },
      "description":{
        "type":"string",
        "description":"Small description for image"
      },
      "publicUrl":{
        "type":"string",
        "description":"Public URL of image"
      },
      "index":{
        "type":"number",
        "description":"Index/Position of image in catalog"
      }
    }
  }
}
