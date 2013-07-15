/**
 * Module dependencies.
 */
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn 
  , express = require('express')
  , routes = require('./app/routes')
  , http = require('http')
  , mongoose = require('mongoose')
  , passport  = require('passport')
  , path = require('path');

/**
 * Mongoose config 
 */
mongoose.set('debug', process.env.NODE_ENV === 'development');
mongoose.connect(process.env.MONGOHQ_URL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to MongoDB");
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('n0d3-c0nt3nt4p1'));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
 * Libraries
 */
require('./lib/passport');

app.get('/', routes.index);
app.get('/:path', routes.contentByPath);

// Export the app for tests/console debugging.
module.exports = app;

if (!module.parent) {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
}
