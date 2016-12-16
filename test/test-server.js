var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Log Room', function() {
    it('should recieve data back', function(done) {
        chai.request(app)
            .get('/home')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                done();
            });
    });
});