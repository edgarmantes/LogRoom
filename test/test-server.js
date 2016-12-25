global.DATABASE_URL = 'mongodb://emantes:1234@ds023458.mlab.com:23458/logroom'

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var LogRoom = require('../models/LogRoom');
var Entries = require('../models/Entries');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Log Room', function() {
	before(function(done) {
        server.runServer( done() );
    });

    it('INDEX should recieve data back', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.a('object');
                res.status.should.equal(200)
                done();
            });
    });

    it('HOME should recieve data back', function(done) {
        chai.request(app)
            .get('/home')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.a('object');
                res.status.should.equal(200)
                done();
            });
    });

    it('LOGROOM should recieve data back', function(done) {
        chai.request(app)
            .get('/logroom')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.a('object');
                res.status.should.equal(200)
                done();
            });
    });

    it('LOGROOM POST should receive data back', function(done) {
        chai.request(app)
            .post('/logroom')
            .send({
            	'dateCreated': '123456789',
			    'Id': '858409959605rf96',
			    'guestsIdsAccepted': '11111',
			    'hostId': '1234',
            })
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('Object');
                res.body.should.have.property('_id');
                res.body.should.have.property('dateCreated');
                res.body.should.have.property('guestsIdsAccepted');
                res.body.should.have.property('hostId');
                res.body.should.have.property('Id');
                res.body.should.have.property('entries');
                res.body.entries.should.be.a('array');
                res.body.dateCreated.should.be.a('string');
                res.body._id.should.be.a('string');

                done();
            });
    });

    // it('LOGROOM DELETE should delete the logroom', function(done){
    // 	chai.request(app)
    // 		.delete('/logroom')
    // 		.send({
    // 			'_id': '5859ccaca160e933dc62950d'
    // 		})
    // 		.end(function(err, res){
    // 			should.equal(err, null);
    // 			res.should.have.status(200);
    // 			done();    			
    // 		})
    // });

    // it('ENTRIES POST should receive data back', function(done){
    // 	chai.request(app)
    // 		.post('/entries')
    // 		.send({
    // 			'logEntry': 'This is a Entries model',
    // 			'_id': '585730b3f5a1e91878d36ab1'
    // 		})
    // 		.end(function(err, res){
    // 			should.equal(err, null);
    // 			res.should.have.status(200);
    // 			done();
    // 		});
    // });

    // it('ENTRIES PUT should receive edited data', function(done){
    // 	chai.request(app)
    // 		.put('/entries')
    // 		.send({
    // 			'logEntry': 'Here is a new Entry...',
    // 			'_id': '585730b3f5a1e91878d36ab1',  // LogRoom ObjectId
    // 			'EntriesId': '585892264b262e2ae8056dc7'
    // 		})
    // 		.end(function(err, res){
    // 			should.equal(err, null);
    // 			res.should.have.status(200);
    // 			done();
    // 		});

    // });

    // it('ENTRIES DELETE should delete entry', function(done){
    // 	chai.request(app)
    // 		.delete('/entries')
    // 		.send({
    // 			'EntryId' : '585895783cdb6b32c83bea63'
    // 		})
    // 		.end(function(err, res){
    // 			should.equal(err, null);
    // 			res.should.have.status(200);
    // 			done();
    // 		});
    // });
});