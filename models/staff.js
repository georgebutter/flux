// Data
var mongoose = require('mongoose');
// Encryption
var bcrypt = require('bcrypt');

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

// Authenticate input against database
StaffSchema.statics.authenticate = function (username, password, callback) {
  Staff.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('Staff not found.');
        err.status = 401;
        return callback(err);
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

// Hashing a password before saving it to the database
StaffSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var Staff = mongoose.model('Staff', StaffSchema);
module.exports.Staff = Staff;
