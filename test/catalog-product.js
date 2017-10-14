var request = require('supertest');

var testinghost = "";
if ( 'development' == process.env.NODE_ENV ) {
    testinghost = 'http://localhost:3000';
} else {
    testinghost = 'http://bolero.pliik.com';
}



var api = request(testinghost,{ secureOptions: "constants.SSL_OP_NO_TLSv1_2" });

var assert = require("assert");

global.rootNode = false;
global.childNode = false;
    
describe('Catalog create product', function() {

    // -------------------------------------------------------------------------
    var rArgs;
    
    before(function(done){
        
        api.post('/api/catalogs.tree.new')
                .send({name: '3DPrinter', node: 'root', price: '-5' })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

            rArgs = arguments;
            done();

        });
        
    });

    it('Creating root with negative price failed', function() {

        var resp = JSON.parse(rArgs[1].text);

        /*
        console.log(resp.detail.errors);
		{ price: 
   			{ 
   				message: 'Path `price` (-5) is less than minimum allowed value (0).',
		     	name: 'ValidatorError',
		     	path: 'price',
		     	type: 'min',
		     	value: -5 
			} 
		} */

        global.rootNode = resp.Catalog._id;                    
        assert.equal(resp.detail.errors.price.name, 'ValidatorError');
        assert.equal(resp.detail.errors.price.path, 'price');
        assert.equal(resp.detail.errors.price.type, 'min');
        assert.equal(resp.detail.errors.price.value, -5);

    });

    
});