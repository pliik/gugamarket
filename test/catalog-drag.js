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

describe('Catalog drag create root', function() {

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

describe('Catalog drag create child', function() {

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
        global.childNode = resp.Catalog._id;
        // process.exit();
        assert.equal('Eric', resp.Catalog.name);
        assert.equal(true,resp.Catalog.leaf);
        assert.equal(global.rootNode, resp.Catalog.parentId);
        assert.ok(true, resp.Catalog._id);


    });

});


describe('Catalog drag create child child', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

        api.post('/api/catalogs.tree.new')
                // .set('x-api-key', '123myapikey')
                .send({name: 'MartinDrag', parentId: global.childNode})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

            rArgs = arguments;
            done();

        });

    });

    it('Creating child child', function() {

        var resp = JSON.parse(rArgs[1].text);
        global.childNode2 = resp.Catalog._id;
        // console.log(resp);
        // process.exit();
        //global.childNode = resp.Catalog._id;
        assert.equal('MartinDrag', resp.Catalog.name);
        assert.equal(true,resp.Catalog.leaf);
        assert.equal(global.childNode, resp.Catalog.parentId);
        assert.ok(true, resp.Catalog._id);


    });

});

describe('Catalog drag second child to root', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

        api.put( '/catalog/update')
                // .set('x-api-key', '123myapikey')
                .send({_id: global.childNode2, name: 'MartinDrag', parentId: ''})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
            rArgs = arguments;
            done();

        });

    });

    it('On child drag to root', function() {

        var resp = JSON.parse(rArgs[1].text);
        // console.log(resp)
        assert.equal('MartinDrag', resp.Catalog.name);
        assert.equal('undefined', typeof resp.Catalog.parentId);
        assert.equal(true,resp.Catalog.leaf);
        assert.ok(true, resp.Catalog._id);

    });

});

describe('Catalog drag delete child', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

        api.del( '/api/catalogs.tree.destroy/' + global.childNode2 )
                // .set('x-api-key', '123myapikey')
                // .send({name: 'Eric', parentId: global.rootNode})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
            rArgs = arguments;
            done();

        });

    });

    it('On drag child delete', function() {

        
        var resp = JSON.parse(rArgs[1].text);
// console.log(resp)
        assert.equal('MartinDrag', resp.Catalog.name);
        assert.equal(true,resp.Catalog.leaf);

    });

});


describe('Catalog drag validate leaf after second child to root', function() {

    // -------------------------------------------------------------------------
    var rArgs;


    before(function(done){

        api.get( '/catalog/'+global.childNode)
                // .set('x-api-key', '123myapikey')
                // .send({_id: global.childNode2, name: 'MartinDrag', parentId: ''})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
            rArgs = arguments;
            done();

        });

    });

    it('On child drag to root validate leaf', function() {

        var resp = JSON.parse(rArgs[1].text);
        // console.log(resp)
        assert.equal('Eric', resp.Catalog.name);
        assert.equal(true,resp.Catalog.leaf);

    });

});


describe('Catalog drag delete root', function() {

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

    it('On drag root delete', function() {

        
        var resp = JSON.parse(rArgs[1].text);
        assert.equal('Manny', resp.Catalog.name);

    });

});