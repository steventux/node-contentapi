/* Config */
process.env.NODE_ENV = 'test'
process.env.PORT = 3001
process.env.MONGOHQ_URL = "mongodb://localhost:27017/node_contentapi_test"

var  app = require('../app')
  ,  Content = require('../app/models/content')
  ,  Factory = require('factory-lady')
  ,  http    = require('http')
  ,  mongoose = require('mongoose')
  ,  request = require('request')
  ,  User = require('../app/models/user');

/* Factories */
Factory.define('content', Content, {
  title    : "Testing!", 
  path     : '/',
  body     : '### Some test content'
});
Factory.define('user', User, {
  apiKey : "a1b2c3d4e5", 
  secret : "z0y9x8w7v6"
});

/* Setup */
before(function(done) {
  this.server = http.createServer(app).listen(process.env.PORT);
  this.databaseCleaner = new DatabaseCleaner('mongodb');
  done();
});
afterEach(function(done){
  this.databaseCleaner.clean(mongoose.connections[0].db,done);
});
/* Teardown */
after(function(done) {
  this.databaseCleaner.clean(mongoose.connections[0].db,done);
  this.server.close(done);
});

/* Exports */
module.exports = {
  app             : app,
  Content         : Content,
  DatabaseCleaner : require('database-cleaner'),
  Factory         : Factory,
  http            : http,
  mongoose        : mongoose,
  request         : request,
  should          : require('should'),
  User            : User
}
