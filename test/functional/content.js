var helper          = require('../test-helper'),
    Content         = helper.Content,
    Factory         = helper.Factory,
    request         = helper.request;

describe('A CMS page', function() {

  before(function(done){
    Factory.create('content',{ path:"foo",title:"Foo!",body:"### Some foo content" },function(){ done(); });
  });

  it('should display content by path', function(done){
    request.get('http://localhost:3001/foo', function(err, res, body) {
      res.statusCode.should.be.ok
      var results = JSON.parse(body).results;
      results.length.should.equal(1);
      results[0].title.should.equal('Foo!');
      results[0].body.should.equal('### Some foo content');
      done();
    });
  });
  it('should respond with a message if content does not exist', function(done){
    request.get('http://localhost:3001/bar', function(err, res, body) {
      res.statusCode.should.equal(404);
      var response = JSON.parse(body);
      response.status.should.equal('not found');
      response.message.should.equal('Document not found');
      done();
    });
  });
});
