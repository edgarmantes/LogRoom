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
            .get('/home/58b95681b28d143fc4d91038')
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
            .get('/logroom/58b95692b28d143fc4d91039')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.a('object');
                res.status.should.equal(200)
                console.log(52, 'mocha', res.body)
                done();
            });
    });

    it('LOGROOM POST should receive data back', function(done) {
        chai.request(app)
            .post('/logroom')
            .send({
            	'dateCreated': '123456789',
			    'roomName': 'For another test',
			    'hostId': '585730b3f5a1e91878d36ab1',
            })
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('Object');
                res.body.should.have.property('_id');
                res.body.should.have.property('dateCreated');
                res.body.should.have.property('roomName');
                res.body.should.have.property('hostId');
                res.body.should.have.property('entries');
                res.body.entries.should.be.a('array');
                res.body.dateCreated.should.be.a('string');
                res.body._id.should.be.a('string');

                done();
            });
    });

});


describe("Home Page", function(){
    it('should create new project', function(){
        chai.request(app)
        .post('/logroom')
        .send({
            'dateCreated': '123456789',
            'roomName': 'For another test',
            'hostId': '585730b3f5a1e91878d36ab1',
        })
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('Object');
            res.body.should.have.property('_id');
            res.body.should.have.property('dateCreated');
            res.body.should.have.property('roomName');
            res.body.should.have.property('hostId');
            res.body.should.have.property('entries');
            res.body.entries.should.be.a('array');
            res.body.dateCreated.should.be.a('string');
            res.body._id.should.be.a('string');

            done();
        });
    });
});