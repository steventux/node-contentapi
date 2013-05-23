var helper          = require('../../test-helper'),
    cheerio         = require('cheerio'),
    Content         = helper.Content,
    Factory         = helper.Factory,
    request         = helper.request;

describe('Admin contents page', function() {

  before(function(done){
    Factory.create('user', { username : 'admin', password: 'blank' }, function(){});
    Factory.create('content',{ path:"foo",title:"Foo!",body:"### Some foo content" },function(){});
    Factory.create('content',{ path:"bar",title:"Bar!",body:"### Some bar content" },function(){});
    Factory.create('content',{ path:"meh",title:"Meh!",body:"### Some meh content" },function(){});
    done();
  });

  it('should display content by path', function(done){
    request.post('http://localhost:3001/login', { form: { username : 'admin', password: 'blank' } }, function(err, res, body) {
      request.get('http://localhost:3001/admin/contents', function(err, res, body) {
        var $ = cheerio.load(body);
        res.statusCode.should.be.ok
        $('td').eq(0).text().should.match(/Foo!/);
        $('td').eq(1).text().should.match(/foo/);
        $('td').eq(2).text().should.match(/Bar!/);
        $('td').eq(3).text().should.match(/bar/);
        $('td').eq(4).text().should.match(/Meh!/);
        $('td').eq(5).text().should.match(/meh/);
        done();
      });
    });
  });
});

