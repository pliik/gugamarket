var request = require('supertest');

var testinghost = "";
if ( 'development' == process.env.NODE_ENV ) {
    testinghost = 'http://localhost:3000';
} else {
    testinghost = 'http://bolero.pliik.com';
}

console.log("\n\n"+'+---------------------------------');
console.log("| SERVER:" + testinghost);
console.log('+---------------------------------');

var api = request(testinghost,{ secureOptions: "constants.SSL_OP_NO_TLSv1_2" });
var assert = require("assert");

global.rootNode = false;
global.childNode = false;
global.childNodeDuplicate = false;


describe('Catalog create root', function() {

    // -------------------------------------------------------------------------
    var rArgs;

    before(function(done){

        api.post('/api/catalogs.tree.new')
                .send({name: 'Manny', node: 'root'})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

            rArgs = arguments;
            done();

        });

    });

    it('Creating root', function() {

        var resp = JSON.parse(rArgs[1].text);
        global.rootNode = resp.Catalog._id;
        // console.log(resp);
        // console.log(global.rootNode);
        // console.log(resp);
        // process.exit();

        assert.equal(resp.Catalog.name, 'Manny');
        assert.equal(resp.Catalog.leaf, true);
        assert.ok(true, resp.Catalog._id);


    });


});

describe('Catalog create duplicate root', function() {

    // -------------------------------------------------------------------------
    var rArgs;

    before(function(done){

        api.post('/api/catalogs.tree.new')
                .send({name: 'Manny', node: 'root'})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

            rArgs = arguments;
            done();

        });

    });

    it('Creating root failed because of existing root node', function() {

        var resp = JSON.parse(rArgs[1].text);
        // console.log(resp); process.exit();
        assert.notEqual(resp.message.search(/dup key: { : "Manny", : true, : null }/i),-1);;
        //'E11000 duplicate key error index: ecomm_database.catalogs.$name_1_root_1  dup key: { : "Manny", : "true" }');

    });


});

describe('Catalog create child', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

        api.post('/api/catalogs.tree.new')
                // .set('x-api-key', '123myapikey')
                .send({name: 'Eric', parentId: global.rootNode})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

            rArgs = arguments;
            done();

        });

    });

    it('Creating child', function() {

        var resp = JSON.parse(rArgs[1].text);
        // console.log(resp);
        // process.exit();
        global.childNode = resp.Catalog._id;
        assert.equal('Eric', resp.Catalog.name);
        assert.equal(true,resp.Catalog.leaf);
        assert.equal(global.rootNode, resp.Catalog.parentId);
        assert.ok(true, resp.Catalog._id);


    });

});

describe('Catalog validate parent leaf is false', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

        api.get( '/api/catalogs.tree.read/' + global.rootNode )
                // .set('x-api-key', '123myapikey')
                // .send({name: 'Eric', parentId: global.rootNode})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
            rArgs = arguments;
            done();

        });

    });

    it('On child update', function() {

        
        var resp = JSON.parse(rArgs[1].text);

        assert.equal('Manny', resp.Catalog.name);
        assert.equal(false,resp.Catalog.leaf);

    });

});

describe('Catalog create duplicate child', function() {

    // -------------------------------------------------------------------------
    var rArgs;

    var parent = false;    


    before(function(done){

        api.post('/api/catalogs.tree.new')
                // .set('x-api-key', '123myapikey')
                .send({name: 'Eric', parentId: global.rootNode})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

            parent = global.rootNode;
            rArgs = arguments;
            done();

        });

    });

    it('Creating duplicate child', function() {

        var resp = JSON.parse(rArgs[1].text);
        // console.log(resp); process.exit();

var pattern1 = "/dup key: { : \"Eric\", : null, : ObjectId\\('"+parent+"'\\) }/";
//console.log(pattern1)
//console.log(resp.message)
var regex = new RegExp(pattern1, 'gi');
        assert.notEqual(resp.message.search(regex,-1));
        //'E11000 duplicate key error index: ecomm_database.catalogs.$name_1_root_1  dup key: { : "Manny", : "true" }');



    });
// process.exit();
});


describe('Catalog remove root', function() {

    // -------------------------------------------------------------------------
    var rArgs;

    before(function(done){
        // console.log(global.rootNode);
        api.del('/api/catalogs.tree.destroy')
                // .set('x-api-key', '123myapikey')
                .send({_id: global.rootNode, node: 'root'})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

            rArgs = arguments;
            done();

        });

    });

    it('Failed because has a child', function() {

        var resp = JSON.parse(rArgs[1].text);
        // console.log(rArgs);
        assert.equal(resp.message, 'MCPR01: Model.Catalog.pre.remove.children');
        assert.equal(false, resp.success);

    });

});


describe('Catalog remove child', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

        api.del('/api/catalogs.tree.destroy')
                // .set('x-api-key', '123myapikey')
                .send({_id: global.childNode})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

            rArgs = arguments;
            done();

        });

    });

    it('Child removed', function() {

        var resp = JSON.parse(rArgs[1].text);
        assert.equal('Eric', resp.Catalog.name);
        assert.equal(global.rootNode, resp.Catalog.parentId);
        assert.ok(true, resp.Catalog._id);

    });

});


describe('Catalog validate parent leaf is true', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

         setTimeout(function(){
                api.get( '/api/catalogs.tree.read/' + global.rootNode )
                        // .set('x-api-key', '123myapikey')
                        // .send({name: 'Eric', parentId: global.rootNode})
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end(function(err, res) {
                    rArgs = arguments;
                    done();

                });
        }, 100);



    });

    it('On child remove', function() {


        var resp = JSON.parse(rArgs[1].text);
        // console.log(resp);

        if ( ! resp.Catalog.leaf ) {
            process.exit();
        }
        assert.equal('Manny', resp.Catalog.name);
        assert.equal(true,resp.Catalog.leaf);

    });

});

describe('Catalog remove root', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

        api.del('/api/catalogs.tree.destroy')
                // .set('x-api-key', '123myapikey')
                .send({_id: global.rootNode, node: 'root'})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

            rArgs = arguments;
            done();

        });

    });

    it('Root removed', function() {

        var resp = JSON.parse(rArgs[1].text);
        assert.equal('Manny', resp.Catalog.name);
        assert.equal(global.rootNode, resp.Catalog._id);
        assert.ok(true, resp.Catalog._id);

    });

});