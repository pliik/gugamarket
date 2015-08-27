var request = require('supertest');

var testinghost = "";
if ( 'development' == process.env.NODE_ENV ) {
    testinghost = 'http://localhost:3000';
} else {
    testinghost = 'http://bolero.pliik.com';
}

var api    = request(testinghost);
var assert = require("assert");

global.rootNode           = false;
global.childNode          = false;
global.childNodeDuplicate = false;
global.rootNodeClone      = false;
global.idMapping          = false;

// Catalog cloning
describe('Catalog cloning test', function() {

	before(function(done){
		// Create root node
		describe('Catalog cloning test : Test data creation - Mindy', function() {

		    // -------------------------------------------------------------------------
		    var rArgs;

		    before(function(done){
		        api.post('/api/catalogs.tree.new')
		                .send({name: 'Mindy', node: 'root'})
		                .expect(200)
		                .expect('Content-Type', /json/)
		                .end(function(err, res) {
		            		rArgs = arguments;
		            		done();
				        });
		    });

		    it('Creating dummy catalog', function() {
		        var resp = JSON.parse(rArgs[1].text);
		        global.rootNode = resp.Catalog._id;
		        assert.equal(resp.Catalog.name, 'Mindy');
		        assert.equal(resp.Catalog.leaf, true);
		        assert.ok(true, resp.Catalog._id);
		    });

		});
		// Create root node first child
		describe('Catalog cloning test : Test data creation - Sabrina', function() {

		    // -------------------------------------------------------------------------
		    var rArgs;

		    before(function(done){
		        api.post('/api/catalogs.tree.new')
		                .send({name: 'Sabrina', parentId: global.rootNode})
		                .expect(200)
		                .expect('Content-Type', /json/)
		                .end(function(err, res) {
				            rArgs = arguments;
				            done();
				        });
		    });

		    it('Creating dummy catalog\'s first child', function() {
		        var resp = JSON.parse(rArgs[1].text);
		        assert.equal('Sabrina', resp.Catalog.name);
		        assert.equal(true,resp.Catalog.leaf);
		        assert.equal(global.rootNode, resp.Catalog.parentId);
		        assert.ok(true, resp.Catalog._id);
		    });

		});

		// Create root node second child
		describe('Catalog cloning test : Test data creation - Katrina', function() {

		    // -------------------------------------------------------------------------
		    var rArgs;

		    before(function(done){
		        api.post('/api/catalogs.tree.new')
		                .send({name: 'Katrina', parentId: global.rootNode})
		                .expect(200)
		                .expect('Content-Type', /json/)
		                .end(function(err, res) {
				            rArgs = arguments;
				            done();
				        });
		    });

		    it('Creating dummy catalog\'s second child', function() {
		        var resp = JSON.parse(rArgs[1].text);
		        global.childNode = resp.Catalog._id;
		        assert.equal('Katrina', resp.Catalog.name);
		        assert.equal(true,resp.Catalog.leaf);
		        assert.equal(global.rootNode, resp.Catalog.parentId);
		        assert.ok(true, resp.Catalog._id);
		    });

		});

		// Create root node third child
		describe('Catalog cloning test : Test data creation - Philip', function() {

		    // -------------------------------------------------------------------------
		    var rArgs;

		    before(function(done){
		        api.post('/api/catalogs.tree.new')
		                .send({name: 'Philip', parentId: global.rootNode})
		                .expect(200)
		                .expect('Content-Type', /json/)
		                .end(function(err, res) {
				            rArgs = arguments;
				            done();
				        });
		    });

		    it('Creating dummy catalog\'s third child', function() {
		        var resp = JSON.parse(rArgs[1].text);
		        assert.equal('Philip', resp.Catalog.name);
		        assert.equal(true,resp.Catalog.leaf);
		        assert.equal(global.rootNode, resp.Catalog.parentId);
		        assert.ok(true, resp.Catalog._id);
		    });

		});

		// Create child of root node first child
		describe('Catalog cloning test : Test data creation - Martin', function() {

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

		    it('Creating dummy catalog\'s first child child', function() {
		        var resp = JSON.parse(rArgs[1].text);
		        assert.equal('Martin', resp.Catalog.name);
		        assert.equal(true,resp.Catalog.leaf);
		        assert.equal(global.childNode, resp.Catalog.parentId);
		        assert.ok(true, resp.Catalog._id);
		    });

		});
		done();
	});

	after(function(done){

		// Validate dummy catalog clone

		describe('Catalog cloning test : Clone validation', function() {
			before(function(done){
				describe('Catalog cloning test : Clone validation : Check clone', function() {
					var rArgs;
					before(function(done) {
						api.get( '/catalog/' + global.rootNodeClone )
							.expect(200)
							.expect('Content-Type', /json/)
							.end(function(err, res) {
								rArgs = arguments;
								done();
							});
					});
					it('Clone structure', function() {
				        var resp = JSON.parse(rArgs[1].text);
				        // assert.equal('Mindy_clone', resp.Catalog.name);
				        assert.equal(resp.Catalog.name.search(/Mindy_clone/i),0);
		        		assert.equal(true,resp.Catalog.root);
				        assert.ok(true, resp.success);
				    });
				});
				describe('Catalog cloning test : Clone validation : Check clone childs', function() {
					var rArgs;
					before(function(done) {
						api.get( '/catalog/children?node=' + global.rootNodeClone )
							.expect(200)
							.expect('Content-Type', /json/)
							.end(function(err, res) {
								rArgs = arguments;
								done();
							});
					});
					it('Clone structure', function() {
				        var resp = JSON.parse(rArgs[1].text);
				        var async = require('async');
				        childCount = 0;
				        async.forEach(
                            resp.children,
                            function(childNode, cb) {
                            	if (childNode.name == 'Sabrina' || childNode.name == 'Katrina' || childNode.name == 'Philip') childCount++;
                            	if (childNode.name == 'Katrina') {
                            		api.get( '/catalog/children?node=' + childNode._id )
										.expect(200)
										.expect('Content-Type', /json/)
										.end(function(err, result) {
											if (!err) {
												//console.log(arguments[1].res.body.children);
												arguments[1].res.body.children.forEach(function(innerChild){
													if (innerChild.name == 'Martin') childCount++;
												});
											}
											cb();
										});
                            	} else { cb(); }
                            },
                            function(err) { assert.equal(4, childCount); }
                        );
				    });
				});
				done();
			});

			it('Cleaning dummy data', function(){
				// Delete dummy catalog
				describe('Catalog cloning test : Test data removal ', function() {
					var rArgs;
					before(function(done) {
						api.del( '/catalog/delete-cascade/' + global.rootNode )
							.expect(200)
							.expect('Content-Type', /json/)
							.end(function(err, res) {
								rArgs = arguments;
								done();
							});
					});
					it('Removing dummy catalog', function() {
				        var resp = JSON.parse(rArgs[1].text);
				        assert.equal('Mindy', resp.Catalog.name);
				        // assert.equal(resp.Catalog.name.search(/Mindy_clone/i),0);
				        assert.equal(true,resp.Catalog.root);
				        assert.ok(true, resp.success);
				    });
				    
				});

				// Delete clone of dummy catalog
				describe('Catalog cloning test : Test data removal ', function() {
					var rArgs;
					before(function(done) {
						api.del( '/catalog/delete-cascade/' + global.rootNodeClone )
							.expect(200)
							.expect('Content-Type', /json/)
							.end(function(err, res) {
								rArgs = arguments;
								done();
							});
					});
					it('Removing dummy catalog clone', function() {
				        var resp = JSON.parse(rArgs[1].text);
				        // assert.equal('Mindy_clone', resp.Catalog.name);
				        assert.equal(resp.Catalog.name.search(/Mindy_clone/i),0);
				        assert.equal(true,resp.Catalog.root);
				        assert.ok(true, resp.success);
				    });
				});
			});

		});

		done();

	});

	it('Catalog cloning test : Dummy catalog cloning', function(){

		describe('Catalog cloning test : Dummy catalog cloning', function() {
		    // -------------------------------------------------------------------------
		    var rArgs;

		    before(function(done){
		        api.put( '/catalog/clone/' + global.rootNode )
	                .expect(200)
	                .expect('Content-Type', /json/)
	                .end(function(err, res) {
			            rArgs = arguments;
			            // console.log(err);
			            done();
			        });
		    });

		    it('Cloning dummy catalog', function() {
		        var resp = JSON.parse(rArgs[1].text);
		        global.rootNodeClone = resp.Catalog._id;
		        // assert.equal('Mindy_clone', resp.Catalog.name);
		        // console.log(resp)
		        assert.equal(resp.Catalog.name.search(/Mindy_clone/i),0);
		        assert.equal(false,resp.Catalog.leaf);
		        assert.ok(true, resp.success);
		    });

		});

	});

});