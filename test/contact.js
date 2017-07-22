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
    it('should be Forbidden to GET all contacts without a token', function(done) {
      chai.request(server)
        .get('/phonebook')
        .end(function(err, res) {
          res.should.have.status(403);
          done();
        });
    });

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


  describe('/POST phonebook', function() {
    it('should be Forbidden to POST a contact without a token', function(done) {
      chai.request(server)
        .post('/phonebook')
        .end(function(err, res) {
          res.should.have.status(403);
          done();
        });
    });

    it('should not POST a phonebook contact without a name', function(done) {
      chai.request(server)
        .post('/phonebook')
        .set('x-access-token' , token)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('name');
          res.body.errors.name.should.have.property('kind').eql('required');
          done();
        });
    });

    it('should POST a phonebook contact', function(done) {
      var contact = {
        name: 'Alan Jenkins',
        email: 'alan@functionfirst.co.uk',
        mobile: '07795 363980'
      };

      chai.request(server)
        .post('/phonebook')
        .send(contact)
        .set('x-access-token' , token)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('New contact created successfully');
          res.body.contact.should.have.property('name');
          res.body.contact.should.have.property('email');
          res.body.contact.should.have.property('mobile');
          res.body.contact.should.have.property('_id');
          done();
        });
    });
  });


  // Get a single contact

  // Update a single contact

  // Delete a single contact
});