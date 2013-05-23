var mongoose = require('mongoose')
  , passwordHash = require('password-hash');
var User = function() {

  var userSchema = mongoose.Schema({
    username: String,
    password: String
  }, { collection: 'users' } );

  userSchema.methods.validPassword = function(password) {
    return passwordHash.verify(password, this.password);
  }
  return mongoose.model('User', userSchema);

}();


module.exports = User;
