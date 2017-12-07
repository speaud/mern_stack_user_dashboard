// let mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../index');

chai.use(chaiHttp);




const UserModelSchema = require('../models/user.model');

describe('User CRUD Test', () => {
	let testUser = {
		fullName: "mocha tester",
		email: "mocha@tester.com",
		username: "mochatester",
		password: "MochaTester!"
	}

	it('Create new user', (done) => {
		chai.request(server)
		.post('/api/signup')
		.send(testUser)
		.end((err, res) => {
		  	res.should.have.status(200);
		  	res.body.data.should.have.property('_id');

			testUser.id = res.body.data['_id']
		  done();
		});
	});

	it('Log in as new user', (done) => {
		chai.request(server)
		.get('/api/login')
		.query({username: testUser.username, password: testUser.password})
		.end((err, res) => {
		  	res.should.have.status(200);
		  	res.body.data.should.have.property('token');
			
			testUser.token = res.body.data['token']
		  done();
		});
	});

// Update new user

// Confirm new user updated

	it('Delete new user', (done) => {
		chai.request(server)
	    .delete('/api/verified/user/' + testUser.id)
	    .set('x-access-token', testUser.token)
	    .end((err, res) => {
		  	res.should.have.status(200);
	      done();
	    });
	});

// Confirm new user deleted

})
