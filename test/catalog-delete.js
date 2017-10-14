var request = require('supertest');

var testinghost = "";
if ( 'development' == process.env.NODE_ENV ) {
    testinghost = 'http://localhost:3000';
} else {
    testinghost = 'http://bolero.pliik.com';
}

//console.log("\n\n"+'+---------------------------------');
//console.log("| SERVER:" + testinghost);
//console.log('+---------------------------------');

var api = request(testinghost);
var assert = require("assert");

global.rootNode = false;
global.childNode = false;
global.childNodeDuplicate = false;


describe('Catalog cascade delete create root', function() {

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

describe('Catalog cascade delete create child', function() {

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
        assert.equal('Eric', resp.Catalog.name);
        assert.equal(true,resp.Catalog.leaf);
        assert.equal(global.rootNode, resp.Catalog.parentId);
        assert.ok(true, resp.Catalog._id);


    });

});

describe('Catalog cascade delete create second child', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

        api.post('/api/catalogs.tree.new')
                // .set('x-api-key', '123myapikey')
                .send({name: 'Marta', parentId: global.rootNode})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

            rArgs = arguments;
            done();

        });

    });

    it('Creating second child', function() {

        var resp = JSON.parse(rArgs[1].text);
        // console.log(resp);
        // process.exit();
        // global.childNode = resp.Catalog._id;
        global.childNode = resp.Catalog._id;
        assert.equal('Marta', resp.Catalog.name);
        assert.equal(true,resp.Catalog.leaf);
        assert.equal(global.rootNode, resp.Catalog.parentId);
        assert.ok(true, resp.Catalog._id);


    });

});

describe('Catalog cascade delete create third child', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

        api.post('/api/catalogs.tree.new')
                // .set('x-api-key', '123myapikey')
                .send({name: 'Augusto', parentId: global.rootNode})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

            rArgs = arguments;
            done();

        });

    });

    it('Creating third child', function() {

        var resp = JSON.parse(rArgs[1].text);
        // console.log(resp);
        // process.exit();
        // global.childNode = resp.Catalog._id;
        assert.equal('Augusto', resp.Catalog.name);
        assert.equal(true,resp.Catalog.leaf);
        assert.equal(global.rootNode, resp.Catalog.parentId);
        assert.ok(true, resp.Catalog._id);


    });

});

describe('Catalog cascade delete create child child', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

        api.post('/api/catalogs.tree.new')
                // .set('x-api-key', '123myapikey')
                .send({name: 'Martin', parentId: global.childNode})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

            rArgs = arguments;
            done();

        });

    });

    it('Creating child child', function() {

        var resp = JSON.parse(rArgs[1].text);
        // console.log(resp);
        // process.exit();
        //global.childNode = resp.Catalog._id;
        assert.equal('Martin', resp.Catalog.name);
        assert.equal(true,resp.Catalog.leaf);
        assert.equal(global.childNode, resp.Catalog.parentId);
        assert.ok(true, resp.Catalog._id);


    });

});

describe('Catalog cascade delete delete root', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

        api.del( '/api/catalogs.tree.destroy/' + global.rootNode )
                // .set('x-api-key', '123myapikey')
                // .send({name: 'Eric', parentId: global.rootNode})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
            rArgs = arguments;
            done();

        });

    });

    it('On parent cascade delete', function() {

        
        var resp = JSON.parse(rArgs[1].text);
// console.log(resp)
        assert.equal('Manny', resp.Catalog.name);
        assert.equal(false,resp.Catalog.leaf);

    });

});


describe('Catalog node delete create root', function() {

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


describe('Catalog node delete delete root', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

        api.del( '/api/catalogs.tree.destroy/' + global.rootNode )
                // .set('x-api-key', '123myapikey')
                // .send({name: 'Eric', parentId: global.rootNode})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
            rArgs = arguments;
            done();

        });

    });

    it('On parent node delete', function() {

        
        var resp = JSON.parse(rArgs[1].text);
// console.log(resp)
        assert.equal('Manny', resp.Catalog.name);
        assert.equal(true,resp.Catalog.leaf);

    });

});


