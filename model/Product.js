module.exports = function (mongoose,models) {
    
    var ProductSchema = new mongoose.Schema({
        // _id: ProductSchema.ObjectId,
        title: { type: String, required: true },
        description: { type: String, required: false },
        //style: { type: String, unique: true },
        //images: [models.Image],
        //categories: [models.Category],
        //catalogs: [models.Catalog],
        //variants: [models.Variant],
        price: { type: Number, required: true, min: 0 },
        modified: { type: Date, default: Date.now }
    });
    
    // validation

    ProductSchema.path('title').validate(function (v) {
        // console.log("validate title");
        // console.log(v);
        return v.length > 5;
    },'Model.Product.validate.title.length.min.5');

    ProductSchema.path('title').validate(function (v) {
        // console.log("validate title");
        // console.log(v);
        return v.length < 60;
    },'Model.Product.validate.title.length.max.60');    
/*
    ProductSchema.path('style').validate(function (v) {
        console.log("validate style");
        console.log(v);
        return v.length < 40;
    }, 'Product style attribute is should be less than 40 characters');
*/
    ProductSchema.path('description').validate(function (v) {
        // console.log("validate description");
        // console.log(v);
        return v.length > 10;
    }, 'Model.Product.validate.description.length.min.10');
    
    var Product = mongoose.model('Product', ProductSchema);
 
    //put custom methods here
 
    return {
        Product: Product
    }
    
}