module.exports = function(mongoose, models, nestedSetPlugin) {

    var ImagesSchema = new mongoose.Schema({
        catalog: { required: true, type: mongoose.Schema.ObjectId, ref: 'Catalog' },
        /*
        kind: {
            type: String, 
            enum: ['thumbnail', 'catalog', 'detail', 'zoom'],
            required: false
        },
        */
        pathname: { type: String, required: true },
        description: { type: String, required: false},
        base64: { type: String, require: false },
        publicUrl: { type: String, required: false },
        index: {
            type: Number, 
            required: true,
            default: 0,
            min: 0
        }
    });

    ImagesSchema.index( {catalog: 1, index: 1}, {unique: true}); // schema level

    // Include plugin
    ImagesSchema.plugin(nestedSetPlugin);

    var Images = mongoose.model('Images', ImagesSchema);

    return { Images: Images }

}