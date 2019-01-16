// Data
var mongoose = require('mongoose');

// Data Models
var SiteSchema = new mongoose.Schema({
  name: 'string',
  handle: 'string',
  email: 'string',
  description: 'string',
  installed: {
    type: Boolean,
    default: false
  }
});

var Site = mongoose.model('Site', SiteSchema);
module.exports.Site = Site;
