module.exports = function (mongoose) {
    
    var SizeSchema = new mongoose.Schema({
        size: { type: String, required: true },
        available: { type: Number, required: true, min: 0, max: 1000 },
        sku: { 
            type: String, 
            required: true, 
            validate: [/[a-zA-Z0-9]/, 'Product sku should only have letters and numbers']
        },
        price: { type: Number, required: true, min: 0 }
    });
    
    var Size = mongoose.model('Size', SizeSchema);
 
    //put custom methods here
 
    return {
        Size: Size
    }
    
}