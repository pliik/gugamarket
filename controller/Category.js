/**
 * This method read records
 *
 * @param req
 * @param res
 */
exports.read = {
    list: function(req, res) {
        var params = req.body;
        exports.model.Category.find({}, function(err, records) {
            res.send({success: true, Catalog: records});
        });
    },
    tree : function(req, res) {
        var params = req.body;
        exports.model.Category.find({}, function(err, records) {
            res.send({
                success: true, 
                expanded: true,
                children: records
            });
        });
    }
};
 
/**
 * This method create records
 *
 * @param req
 * @param res
 */
exports.add = function (req, res) {
    var params = req.body,
        item;
 
    item = new exports.model.Category(params);
 
    item.save(function(err) {
        if(!err) {
            res.send({success: true, Category: item});
        }
        else {
            res.send({
                success: false, 
                Category: item, 
                message:err.message,
                detail:err
            });
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
 
    exports.model.Category.update({"_id": id},{ $set : params}, {upsert:false}, function (err) {
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
    var params = req.body;
 
    exports.model.Category.remove({"_id": params._id}, function (err) {
        if(!err) {
            res.send({success: true});
        }
        else {
            res.send({success: false});
        }
    });
};