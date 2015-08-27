module.exports = function (mongoose, models, nestedSetPlugin) {
    
    var CategorySchema = new mongoose.Schema({
        name: String
    });
    
    // Include plugin
    CategorySchema.plugin(nestedSetPlugin);
    
    var Category = mongoose.model('Category', CategorySchema);
 
    //put custom methods here
 
    return {
        Category: Category
    }
    
}