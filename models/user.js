var mongoose = require('mongoose')
  , passwordHash = require('password-hash');
var User = function() {

  var userSchema = mongoose.Schema({
    apiKey : String,
    secret : String
  }, { collection: 'users' } );

  return mongoose.model('User', userSchema);

}();


module.exports = User;
