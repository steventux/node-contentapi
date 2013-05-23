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
      body.should.match(/Some foo content/)
      done();
    });
  });
});
