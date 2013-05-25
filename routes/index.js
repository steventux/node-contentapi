var Content = require('./../models/content'),
    mongoose = require('mongoose');

/*
 * GET contents.
 */
exports.index = function(req, res){
  Content.find(function(err, docs) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(200, { 'status' : 'ok', 'results' : docs });
    }
  });
}


/*
 * GET content by path.
 */
exports.contentByPath = function(req, res){
  Content.findOne({ path : req.params.path }, function(err, doc) {
      if (err) { 
        res.json(500, err); 
      } else if (doc == null) {
        res.json(404, { 'status' : 'not found', 'message': 'Document not found' })
      } else {
        res.json(200, { 'status' : 'ok', 'results' : [doc] });
      }
  });
}
