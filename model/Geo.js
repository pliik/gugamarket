module.exports = function (mongoose,models) {
    
    var GeoSchema = new mongoose.Schema({
		pos : {
	        // index: '2dsphere',
	        required: true,
	        type: [Number]
        },
        latitude : {
            required: true,
            type: Number
        },
        longitude : {
            required: true,
            type: Number
        },
		catalog: { required: true, type: mongoose.Schema.ObjectId, ref: 'Catalog' },
		index: {
			type: Number, 
			required: false,
			default: 0,
			min: 0
		}
    });
    

     GeoSchema.index({ "pos" : "2dsphere"});
     GeoSchema.index(
            {longitude: 1, latitude: 1, catalog: 1}
    , {unique: true}); // schema level

    var Geo = mongoose.model('GeoLocation', GeoSchema);
 
    //put custom methods here
    //GeoSchema.pre('save', function(next) {



    //});
 
    return {
        Geo: Geo
    }
    
}

/*
var schema = new Schema({
  pos : [Number],
  type: String
});

schema.index({ "pos" : "2dsphere"});

mongoose.model('Geo', schema);

*/ 


