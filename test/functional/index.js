var helper          = require('../test-helper'),
    Content         = helper.Content,
    Factory         = helper.Factory,
    request         = helper.request;

describe('GET to index', function() {

  before(function(done){
    Factory.create('content', { title : 'Meh content', body : '## Meh!' }, function(){});
    Factory.create('content', { title : 'Foo content', body : '## Foo is your daddy?' }, function(){
      done();
    });
  });
 
  it('should list contents', function(done){
    request.get('http://localhost:3001/', function(err, res, body) {
      res.statusCode.should.be.ok
      var results = JSON.parse(body).results;
      results.length.should.equal(2);
      results[0].title.should.equal('Meh content');
      results[1].title.should.equal('Foo content');
      results[0].body.should.equal('## Meh!');
      results[1].body.should.equal('## Foo is your daddy?');
      done();
    });
  });

});
