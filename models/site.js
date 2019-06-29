// Data
const mongoose = require('mongoose');

// Data Models
const SiteSchema = new mongoose.Schema({
  name: 'string',
  handle: 'string',
  email: 'string',
  description: 'string',
  installed: {
    type: Boolean,
    default: false
  }
});

const Site = mongoose.model('Site', SiteSchema);
module.exports.Site = Site;
