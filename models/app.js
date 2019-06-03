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

// Authenticate input against database
AppSchema.statics.authenticate = function (key, password, callback) {
  App.findOne({ key: key })
    .exec(function (err, app) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('App not found.');
        err.status = 401;
        return callback(err);
      }

      bcrypt.compare(password, app.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

// Hashing a password before saving it to the database
AppSchema.pre('save', function (next) {
  var app = this;
  bcrypt.hash(app.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    app.password = hash;
    next();
  })
});

var App = mongoose.model('App', AppSchema);
module.exports.App = App;
