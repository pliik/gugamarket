var _this = this;

/**
 * This method read records
 *
 * @param req
 * @param res
 */
exports.read = {

    list: function(req, res, user) {
        var params = req.body;
        // exports.model.Catalog.findById(
        exports.model.Catalog.findOne(
            {_id:req.params.id,userId: user._id}
            , function(err, record) {
            if (!err) {
                res.send({success: true, Catalog: record});
            } else {
                res.send({
                    success: false,
                    Catalog: record,
                    message: err.message,
                    detail: err
                });
            }
        });
    },

    tree: function(req, res, user) {

        var params = req.body;

        //console.log(req.query);
        var criteria = req.query.node !== 'root' ?
                        {userId: user._id,parentId: req.query.node} :
                        {userId: user._id,parentId: null/*{$exists: false}*/ }; // Get by Parent

        exports.model.Catalog.find(criteria, false, {
                                            //skip:0, // Starting Row
                                            //limit:10, // Ending Row
                                            sort:{
                                                updated: -1 //Sort by Date Added ASC
                                            }
                                            }, function(err, records) {
            if (!err) {
                res.send({
                    success: true,
                    // expanded: true,
                    children: records
                });
            } else {
                res.send({
                    success: false,
                    Catalog: records,
                    message: err.message,
                    detail: err
                });
            }
        });

    }
};

/**
 * This method create records
 *
 * @param req
 * @param res
 */
exports.add = function(req, res, user) {

    console.log(user);

    var params = req.body,
            item;

    delete params._id;

    if (params.parentId === '' || params.parentId === 'root') {
        delete params.parentId;
    }

    console.log(req.body)
    console.log(req.query)
    console.log(req.params)

    // user
    params.userId = user._id;

    item = new exports.model.Catalog(params);

    // console.log('|--> Creating catalog node request ...');
    // console.log(item);

    item.save(function(err,record) {
        if (!err) {
            // console.log('<--| Creating catalog node result ...');
            // console.log(item);
            res.send({success: true, Catalog: record});
        }
        else {
            res.send({
                success: false,
                Catalog: item,
                message: err.message,
                detail: err
            });
        }
    });
};

/**
 *
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 *
 */
 /*
exports.addProduct = function(req, res) {

    var params = req.body, item;

    // console.log(exports.model.Catalog);

    // Run parallel fetch and the insert data as sub-doc mongoose
    var async = require('async');
    async.parallel({
        product: function(callback){

            exports.models.Product.Product.findOne({"_id": params.product}, function (err, product) {

                //console.log(product);
                callback(err, product);

            })

        },
        catalog: function(callback){
            exports.models.Catalog.Catalog.findOne({"_id": params.catalog}, function (err, catalog) {

                // console.log(catalog);
                callback(err, catalog);

            })
        }
    },
    function(err, results) {
        // console.log(results);
        results.catalog.products.push(results.product);
        results.catalog.save(function (err, item) {

            if (!err) {
                res.send({success: true, Catalog: item});
            }
            else {
                res.send({
                    success: false,
                    Catalog: item,
                    message: err.message,
                    detail: err
                });
            }

        });

    });


    // { catalog: '52b185c13322f0b412000004', product: '52b185c13322f0b412000003' }

    // console.log('Adding Product to Catalog Params!')
    // console.log(params)


}
*/

/**
 * This method update records
 *
 * @param req
 * @param res
 */
exports.update = function(req, res, user) {

    console.info('Updating node:' + req.body._id);

    var params = req.body, id = params._id;
    // console.log(params)
    //remove id from values to update
    delete params._id;
    /*
    if (params.parentId === '' || params.parentId === 'root') {
        // delete params.parentId;
        params.parentId = '';
    } */

    exports.model.Catalog.findOne(
        {_id:id,userId: user._id}
        , function(err, record) {
        if (!err) {

            Object.keys(params).forEach(function(element, key, _array) {
                // element is the name of the key.
                // key is just a numerical value for the array
                // _array is the array of all the keys

                // this keyword = secondArg
                switch(element) {
                    case 'parentId':
                        if (params.parentId === '' || params.parentId === 'root') {
                            // delete params.parentId;
                            record[element] = undefined; break;
                        }
                    default:
                        record[element] = params[element];
                }


            });
            // console.log(params)

            record.save(function(err,result){

                if (!err) {
                    res.send({success: true, Catalog: result});
                } else {
                    res.send({
                        success: false,
                        Catalog: result,
                        message: err.message,
                        detail: err
                    });
                }

            });

        } else {
            res.send({
                success: false,
                Catalog: record,
                message: err.message,
                detail: err
            });
        }
    });
    /*
    exports.model.Catalog.update({"_id": id}, {$set: params}, {upsert: false}, function(err, result) {
        if (!err) {

            res.send({success: true, Catalog: result});
        }
        else {
            res.send({
                success: false,
                Catalog: result,
                message: err.message,
                detail: err
            });
        }
    }); */
};

/**
 * This method remove records
 *
 * @param req
 * @param res
 */


exports.delete = function(req, res, user) {


    var params = req.query;

    // Check for duplicates

    console.log('Delete Node');
    console.log(req.query);
    console.log(user);

    console.log(params._id);
    console.log(user._id);

    exports.model.Catalog.findOne({
            _id: params._id
            , userId: user._id
        }, function(err, Catalog) {

        if(err)console.log(err);

        if (Catalog) {

            console.log('Removing ' + Catalog);

            Catalog.remove( function(err, Catalog) {

                if (!err) {
                    //console.log('fail');
                    res.send({success: true,Catalog: Catalog});
                }
                else {
                    //console.log('success');
                    res.send({
                        success: false,
                        Catalog: Catalog,
                        message: err.message,
                        detail: err
                    });
                }
            });

        } else {
            res.send({
                success: false,
                Catalog: Catalog,
                message: 'Controller.Catalog.destroy.notFound'
            });
        }

    });

    return;

}
exports.destroy = {

    cascade : function(req,res,user){

        var Catalog = exports.model.Catalog;

        Catalog.findOne(
            {_id:req.params.id,userId: user._id}
            , function(err, record) {

            if (!err) {

                Catalog.rebuildTree(record, 0, function() {

                    if (!record.isLeaf()) {
                        // at this point, the tree is built and every node has a lft and rgt value.
                        record.descendants(function(err, data) {
                            // data contains a list of michael descendants


                            function compare(a,b) {
                              if (a.lft < b.lft)
                                 return 1;
                              if (a.lft > b.lft)
                                return -1;
                              return 0;
                            }

                            data.sort(compare);

                            // console.log(data);

                            // Run parallel fetch and the insert data as sub-doc mongoose
                            var async = require('async');
                            // console.log(data)
                            async.eachSeries(
                                data,
                                function(item,cb){
                                    // console.log('removing'+item)
                                    item.remove( function(err, removed) {

                                        if (!err) {
                                            //console.log('fail');
                                            cb();
                                        }
                                        else {
                                            cb(err);
                                        }

                                    });
                                },
                                function(err){

                                    if (!err) {

                                        record.remove( function(err, record) {

                                            if (!err) {
                                                res.send({success: true, Catalog: record});
                                            }
                                            else {
                                              res.send({
                                                    success: false,
                                                    Catalog: record,
                                                    message: err.message,
                                                    detail: err
                                                });
                                            }

                                        });

                                    } else {
                                        res.send({
                                            success: false,
                                            Catalog: record,
                                            message: err.message,
                                            detail: err
                                        });
                                    }
                                // if any of the saves produced an error, err would equal that error
                                });

                        });

                    } else {

                        record.remove( function(err, removed) {

                            if (!err) {

                                res.send({success: true, Catalog: record});

                            }
                            else {
                                res.send({
                                success: false,
                                Catalog: record,
                                message: err.message,
                                detail: err
                                });
                            }

                        });
                    }

                });

            } else {

                console.log(user);

                res.send({
                    success: false,
                    Catalog: record,
                    message: err.message,
                    detail: err
                });

            }

        });

    }

}

/*
 * This method clone records
 *
 * @param req
 * @param res
 */

exports.clone = {
    node : function(req, res, user) {
        // Data initialization
        var Catalog = exports.model.Catalog,
            mongoose = require('mongoose'),
            async = require('async'),
            newItem,
            idMapping = [];
        // Function responsible to clone given element and it's childs

        function cloneDocument ( docId , callback, firstrun ) {
            Catalog.findOne(
                {_id:docId}
                , function(err, currDoc ){
                if (!err) {
                    var status = false;
                    delete currDoc.lft;
                    delete currDoc.rgt;
                    newItem = new exports.model.Catalog(currDoc);
                    newItem._id = mongoose.Types.ObjectId();
                    // console.log(firstrun);
                    if (firstrun) {
                        newItem.index = currDoc.index+1; // Must be two...
                        newItem.name+="_clone_" + new Date().getTime();
                    } else {
                        if (currDoc.parentId) newItem.parentId = idMapping[currDoc.parentId];
                    }

                    idMapping[currDoc._id] = newItem._id;

                    newItem.save(function(err, record){
                        if (!err) {
                            // Node created. Create node child's, if needed.
                            Catalog.find({parentId : currDoc._id}).exec(function(err, parentChilds) {
                                if (!err) {
                                    async.forEach(
                                        parentChilds,
                                        function(childNode, cb) { cloneDocument(childNode._id, function(err, child){ cb(err); }, false); },
                                        function(err) { callback(err, record); }
                                    );
                                } else { callback(err, newItem); }
                            });
                        } else { callback(err, null); }
                    });
                } else {
                    console.log("Document not found! (ID:"+docId+")");
                    callback(err, null);
                }
            });

        }
        // Main (Load catalog)
        Catalog.findOne(
            {_id:req.params.id, userId:user._id},
            function(err, mainNode) {
            if (!err) {
                // Catalog exists. Generate catalog's clone
                cloneDocument(mainNode._id, function(err, cloneNode){
                    if(!err) {
                        console.log("Clone Success");
                        res.send({success: true, Catalog: cloneNode});
                    } else {
                        console.log("Clone Failure");
                        // If cloneNode is not null, root clone was created and must be removed.
                        var errorMessage = 'Controller.Catalog.clone.processFailed';
                        if (cloneNode != null) {
                            console.log("Clone Failure - cleaning");
                            _this.destroy.cascade(
                                { params:{id:cloneNode._id} },
                                { send:function(destroyResult){
                                    if (!destroyResult.success) errorMessage = 'Controller.Catalog.clone.processFailed.rollbackFailed';
                                    res.send({
                                        success: false,
                                        Catalog: Catalog,
                                        message: errorMessage,
                                        detail: err
                                    });
                                }}
                            );
                        } else {
                            console.log("Clone Failure - bypass cleaning");
                            res.send({
                                success: false,
                                Catalog: Catalog,
                                message: errorMessage,
                                detail: err
                            });
                        }
                        console.log(err);
                    }
                },true);
            } else {
                // Catalog doesn't exist.
                res.send({
                    success: false,
                    Catalog: Catalog,
                    message: 'Controller.Catalog.clone.elementNotFound'
                });
            }
        });
    }
}
