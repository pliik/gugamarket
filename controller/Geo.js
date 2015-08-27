exports.get = function(req, res) {

        var params = req.body;
        console.log('*** Get get ***');

};

exports.add = function(req, res) {

        var params = {
                pos : [req.query.latitude,req.query.longitude]
                , index : req.query.index
                , catalog: req.query.catalog
                , latitude : req.query.latitude
                , longitude : req.query.longitude
        };

        console.log('*** Get add ***');

        if (typeof params.index != "number") {
                delete params.index;
        }

        var item = new exports.model.Geo(params);

        // console.log('|--> Creating catalog node request ...');
        // console.log(item);

        item.save(function(err,record) {
                if (!err) {
                        // console.log('<--| Creating catalog node result ...');
                        // console.log(item);
                        res.send({success: true, Geo: record});
                }
                else {
                        res.send({
                        success: false,
                        Geo: item,
                        message: err.message,
                        detail: err
                        });
                }
        });

};

exports.delete = function(req, res) {

        // console.log(req);

        console.log('*** Get delete ***' + req.params.id);

        exports.model.Geo.findOne(
                { _id:req.params.id }
                , function(err, Record) {

            if ( Record ) {

                //console.log('Removing ' + Catalog);

                Record.remove( function(err, record) {
         
                    if (!err) {
                        //console.log('fail');
                        res.send({success: true, record: record});
                    }
                    else {
                        //console.log('success');
                        res.send({
                            success: false,
                            record: record,
                            message: err.message,
                            detail: err
                        });
                    }
                });

            } else {
                res.send({
                    success: false,
                    record: Record,
                    message: 'Controller.Geo.destroy.notFound'
                });
            }

        });

};

exports.update = function(req, res) {

        var params = req.body;
        console.log('*** Get update ***');

};

exports.near = function(req, res) {

        var params = req.body;
        console.log('*** Get near ***');

};