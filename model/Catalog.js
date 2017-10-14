module.exports = function(mongoose, models, nestedSetPlugin) {

    var CatalogSchema = new mongoose.Schema({
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

    }, {autoIndex: true});

    CatalogSchema.index(
            {name: 1, root: 1, parentId: 1}
    , {unique: true}); // schema level

    // Include plugin
    CatalogSchema.plugin(nestedSetPlugin);

    // START UPDATE INDEX
    // ---------------------------------------------------
    CatalogSchema.methods.updateIndex = function (cb) {

        var curIndex = this.index;

        this.siblings(function(error,records){

            if (!records) return; // no siblings

            records.sort(function(a, b){
              return a.index > b.index; // crescent
            });

            var i = 0; // console.log('current:'+curIndex);

            records.forEach(function(item) {
                
                if (i==curIndex) {
                    i++;
                }
                
                if ( item.index != i ) {

                    // Update bypass hooks !!!IMPORTANT or infinite loop...
                    item.update({index:i},function(err) {
                        if (!err) {
                            err = new Error('Model.Catalog.index.update');
                        }   
                    }); // console.log('item:'+item.name+'_'+item.index+' new:' +i);
                
                }
 
                i++;

            });

        });

        return;
        
    };
    
    // END UPDATE INDEX
    // ---------------------------------------------------

    var Catalog = mongoose.model('Catalog', CatalogSchema);

    CatalogSchema.post( 'init', function() {
        this._original = this.toObject();
    } );

    CatalogSchema.pre('remove', function(next) {

        // Prevent child delete
        // ------------------------------------------------------------------------------
        this.children(function(err, children) {

            if (children.length > 0) {

                var err = new Error('MCPR01: Model.Catalog.pre.remove.children');
                next(err);

            } else {

                next();

            }

        });

    });

    CatalogSchema.pre('save', function(next) {

        var parent = this.parentId;

        if ( ! parent ) {

            this.root = true;
            next();

        } else {

            this.root = false; // https://bitbucket.org/pliikteam/pliikcom/issue/6

            // validate parentId as foreign key
            Catalog.find({_id:parent}, function(err, records) {
                if (err){                
                    var err = new Error('Model.Catalog.pre.save.parentId');
                    next(err); // console.log(records);
                }
                if (records.length == 0) {
                    var err = new Error('Model.Catalog.pre.save.parentId.notFound');
                    next(err); // console.log(records);
                }
                // console.log(records);
                next();
            });
        }

       // next();

    });




    CatalogSchema.post('save', function(doc) {

        var parentId = doc.parentId;

        /*
        try {console.log(this.name);console.log(this._original.parentId);
        console.log('oldPI:' + this._parentId + ' newPI:' + this.parentId);
         } catch (e){}; */

         var oldParentId = doc.parentId;

         doc.updateIndex();

         if (typeof this._original !== 'undefined' && typeof this._original.parentId !== 'undefined') {
            oldParentId = this._original.parentId;
         }

        // New record update parent status
        if ( parentId /* && typeof this._original === 'undefined' */) {

            // validate parentId as foreign key
            Catalog.findOne({_id:this.parentId}, function(err, parent) {

                if (err){                
                    var err = new Error('Model.Catalog.post.save.parentId');
                    // next(err); // console.log(records);
                }
                if (!parent) {
                    var err = new Error('Model.Catalog.post.save.parentId.notFound');
                    // next(err); // console.log(records);
                }
                // console.log(records);
                if (parent.leaf) {
                    parent.leaf = false;
                    parent.save(function(err) {
                        if (!err) {
                            err = new Error('Model.Catalog.post.save.leaf');
                        }
                    });
                }

            });
        }

        // New record update parent status
        if ( oldParentId && parentId+'' !== oldParentId+'' ) {
            // console.log('...Update old parent '+ oldParentId +'-->'+parentId);

            // validate parentId as foreign key
            Catalog.findById(oldParentId, function(err, parent) {

                if (err){                
                    var err = new Error('Model.Catalog.post.validate.oldParentId');
                    // next(err); // console.log(records);
                }
                if (!parent) {
                    var err = new Error('Model.Catalog.post.validate.oldParentId.notFound');
                    // next(err); // console.log(records);
                }

                parent.children(function(err, children) {

                    if (children.length === 0) {

                        if ( ! parent.leaf ) {

                            parent.leaf = true;
                            parent.save(function(err) {
                                if (!err) {
                                    err = new Error('Model.Catalog.post.remove.leaf.true');
                                }
                            });
                            
                        }

                    } 

                });

            });

        }

    });


    CatalogSchema.post('remove', function(doc) {

        if ( doc.parentId ) {

            // validate parentId as foreign key
            Catalog.findById(doc.parentId, function(err, parent) {

                if (err){                
                    var err = new Error('Model.Catalog.post.remove.parentId');
                    // next(err); // console.log(records);
                }
                if (!parent) {
                    var err = new Error('Model.Catalog.post.remove.parentId.notFound');
                    // next(err); // console.log(records);
                }

                parent.children(function(err, children) {

                    if (children.length === 0) {

                        if ( ! parent.leaf ) {

                            parent.leaf = true;
                            parent.save(function(err) {
                                if (!err) {
                                    err = new Error('Model.Catalog.post.remove.leaf.true');
                                }
                            });
                            
                        }

                    } 

                });

            });
        }

    });

    CatalogSchema.path('root').validate(function(v) {
        // console.log("CatalogSchema validate name");

        if ( this.root && (typeof this.parentId !=='undefined' && this.parentId ) ) { 
            return false; 
        }

        return true;

    }, 'Model.Catalog.validate.root');

    CatalogSchema.path('name').validate(function(v) {
        // console.log("CatalogSchema validate name");
        // console.log(v);
        return v.length > 3;
    }, 'Model.Catalog.validate.name.length.min.3');

    CatalogSchema.path('name').validate(function(v) {
        // console.log("CatalogSchema validate name");
        // console.log(v);
        return v.length < 150;
    }, 'Model.Catalog.validate.name.length.max.40');
    //put custom methods here

    return {
        Catalog: Catalog
    }

}
