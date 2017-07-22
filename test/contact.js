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
        .set('x-access-token', token)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('New contact created successfully');
          res.body.contact.should.have.property('name');
          res.body.contact.should.have.property('email');
          res.body.contact.should.have.property('mobile');
          res.body.contact.should.have.property('_id');
          done();
        });
    });
  });


  describe('/GET/:id phonebook', function() {     
    it('should not GET a phonebook contact without a token', function(done) {
      var contact = new Contact({
        name: 'Alan Jenkins',
        email: 'alan@functionfirst.co.uk',
        mobile: '07795 363980'
      });

      contact.save(function(err, c) {
        chai.request(server)
          .get('/phonebook/' + c._id)
          .end(function(err, res){
            res.should.have.status(403);
            done();
          });
      });
    });

    it('should not GET a phonebook contact', function(done) {
      var contact = new Contact({
        name: 'Alan Jenkins',
        email: 'alan@functionfirst.co.uk',
        mobile: '07795 363980'
      });

      contact.save(function(err, c) {
        chai.request(server)
          .get('/phonebook/' + c.id)
          .set('x-access-token', token)
          .end(function(err, res){
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('email');
            res.body.should.have.property('mobile');
            res.body.should.have.property('_id').eql(contact.id);
            done();
          });
      });
    });
  });

  describe('/PUT/:id phonebook', function() {
    it('should not UPDATE a phonebook contact without a token', function(done) {
      var contact = new Contact({
        name: 'Alan Jenkins',
        email: 'alan@functionfirst.co.uk',
        mobile: '07795 363980'
      });

      contact.save(function(err, c) {
        chai.request(server)
          .put('/phonebook/' + c._id)
          .send(contact)
          .end(function(err, res){
            res.should.have.status(403);
            done();
          });
      });
    });

    it('should UPDATE a phonebook contact', function(done) {
      var contact = new Contact({
        name: 'Alan Jenkins',
        email: 'alan@functionfirst.co.uk',
        mobile: '07795 363980'
      });

      contact.save(function(err, c) {
        chai.request(server)
          .put('/phonebook/' + c._id)
          .send(contact)
          .set('x-access-token', token)
          .end(function(err, res){
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('message').eql('Contact has been updated successfully');
            res.body.should.have.property('contact');
            res.body.contact.should.have.property('name');
            res.body.contact.should.have.property('email');
            res.body.contact.should.have.property('mobile');
            res.body.contact.should.have.property('_id');
            done();
          });
      });
    });
  });

  describe('/DELETE/:id phonebook', function() {
    it('should not DELETE a phonebook contact without a token', function(done) {
      var contact = new Contact({
        name: 'Alan Jenkins',
        email: 'alan@functionfirst.co.uk',
        mobile: '07795 363980'
      });

      contact.save(function(err, c) {
        chai.request(server)
          .delete('/phonebook/' + c._id)
          .send(contact)
          .end(function(err, res){
            res.should.have.status(403);
            done();
          });
      });
    });

    it('should DELETE a phonebook contact', function(done) {
      var contact = new Contact({
        name: 'Alan Jenkins',
        email: 'alan@functionfirst.co.uk',
        mobile: '07795 363980'
      });

      contact.save(function(err, c) {
        chai.request(server)
          .delete('/phonebook/' + c._id)
          .send(contact)
          .set('x-access-token', token)
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('message').eql('Contact has been deleted successfully');
            res.body.should.have.property('id').eql(contact.id);
            done();
          });
      });
    });
  });

  



  // Delete a single contact
});