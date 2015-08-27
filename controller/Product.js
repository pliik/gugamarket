/**
 * This method read records
 *
 * @param req
 * @param res
 */
exports.read = {

    all : function (req, res) {

        var params = req.body;

        exports.model.Product.find(function(err, products) {

            if (!err) {
                res.send({
                    success: true,
                    // expanded: true,
                    Products: products
                });
            } else {
                res.send({
                    success: false//,
                    // expanded: true,
                    // Product: records
                }); 
            }   

        });

    },

    single : function (req, res) {

        var params = req.body;

        // console.log(req.params.id);

        exports.model.Product.findById(req.params.id, function(err, product) {

            if (!err) {
                res.send({
                    success: true,
                    // expanded: true,
                    Product: product
                });
            } else {
                res.send({
                    success: false//,
                    // expanded: true,
                    // Product: records
                }); 
            }

        });

    }

}
 
/**
 * This method create records
 *
 * @param req
 * @param res
 */
exports.add = function (req, res) {
    var params = req.body,
        item;

    // params._id = require('mongodb').BSONPure.ObjectID();

    item = new exports.model.Product(params);
 
    item.save(function(err) {

        if(!err) {

            res.send({success: true, Product: item});

        } else {

            res.send({success: false, Product: item, error : err });

        }

    });

};
 
/**
 * This method update records
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
    var params = req.body, id = params._id;
 
    //remove id from values to update
    delete params._id;
 
    exports.model.Product.update({"_id": id},{ $set : params}, {upsert:false}, function (err) {
        if(!err) {
            res.send({success: true});
        }
        else {
            res.send({success: false});
        }
    });
};
 
/**
 * This method remove records
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
    // var params = req.body;    
    // console.log(params);

    exports.model.Product.remove({"_id": req.params.id}, function (err,item) {
                if (!err) {
                    //console.log('fail');
                    res.send({success: true,Product: item});
                }
                else {
                    //console.log('success');
                    res.send({
                        success: false,
                        Product: item,
                        message: err.message,
                        detail: err
                    });
                }
    });
};