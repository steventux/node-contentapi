
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , mongoose = require('mongoose')
  , passport  = require('passport')
  , path = require('path');

/**
 * Mongoose config 
 */
mongoose.set('debug', true); // TODO: Should be ENV dependent.
mongoose.connect(process.env.MONGOHQ_URL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to MongoDB");
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
 * Libs and helpers.
 */
require('./lib/passport');

app.get('/', routes.index);
// Auth routes
app.get('/login', routes.login);
app.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));
// Admin content routes
app.get('/admin/contents',          ensureLoggedIn(), adminContentRoutes.index);
app.get('/admin/contents/new',      ensureLoggedIn(), adminContentRoutes._new);
app.post('/admin/contents',         ensureLoggedIn(), adminContentRoutes.create);
app.get('/admin/contents/:id/edit', ensureLoggedIn(), adminContentRoutes.edit);

// Give other specific routes priority by placing them before this one
app.get('/:path', routes.contentByPath);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
