// Data
var mongoose = require('mongoose');

// Data Models
var AppSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  themes: {
    type: String,
    required: true,
  }
});

var App = mongoose.model('App', AppSchema);
module.exports.App = App;
