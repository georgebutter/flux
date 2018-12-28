// Data
var mongoose = require('mongoose');
// Data Models
var StaffSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  confirm: {
    type: String,
    required: true,
  }
});
var Staff = mongoose.model('Staff', StaffSchema);
