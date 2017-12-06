let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../index');

chai.use(chaiHttp);

describe('Books', () => {
	

describe('/GET book', () => {
  it('it should GET all the books', (done) => {
		chai.request(server)
	    .get('/api/test')
	    .end((err, res) => {
		  	res.should.have.status(200);
		  	// res.body.should.be.a('array');
		  	// res.body.length.should.be.eql(0);
	      done();
	    });
  });
});
})