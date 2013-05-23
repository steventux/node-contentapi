var mongoose = require('mongoose');

var Content = function() {

  var contentSchema = mongoose.Schema({
    title: { type: String, required: true },
    path: { type: String, required: true },
    body: { type: String, required: true }
  }, { collection: 'contents' } );

  return mongoose.model('Content', contentSchema);

}();

module.exports = Content;
