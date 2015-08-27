module.exports = function (mongoose,models,nestedSetPlugin) {
    
    var VariantSchema = new mongoose.Schema({
        color: String,
        images: [models.Image],
        sizes: [models.Size]
    });
    
    var Variant = mongoose.model('Variant', VariantSchema);
 
    //put custom methods here
 
    return {
        Variant: Variant
    }
    
}