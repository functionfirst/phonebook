process.env.NODE_ENV = 'test';

var Contact   = require('../app/models/contact');
var chai      = require('chai');
var chaiHttp  = require('chai-http');
var server    = require('../index');
var should    = chai.should();

chai.use(chaiHttp);

describe('Contacts', function() {
  var token = '';

  beforeEach(function(done) {
    // Before each test we empty the database
    Contact.remove({}, function(err) {
      done();
    });
  });

  before(function(done) {
    chai.request(server)
        .post('/authenticate')
        .send({
          username:'admin',
          password: 'admin'
        })
        .end(function(err, res) {
            res.redirects.length.should.equal(0);
            res.status.should.equal(200);
            token = res.body.token;
            res.type.should.equal('application/json');
            done();
        });
  });

  describe('/GET phonebook', function() {
    /*
    Test /GET without a token
    */
    
    it('should be Forbidden to GET all phonebook contacts', function(done) {
      chai.request(server)
        .get('/phonebook')
        .end(function(err, res) {
          res.should.have.status(403);
          done();
        });
    });

    /*
      Test /GET with a token
    */
    it('should GET a list of phonebook contacts', function(done) {
      chai.request(server)
        .get('/phonebook')
        .set('x-access-token' , token)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});