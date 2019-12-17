// Data
const mongoose = require('mongoose');

// Data Models
const AppSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
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
  },
});

// Authenticate input against database
AppSchema.statics.authenticate = function(key, password, callback) {
  App.findOne({ key: key })
    .exec(function(err, app) {
      if (err) {
        return callback(err);
      } else if (!app) {
        const err = new Error('App not found.');
        err.status = 401;
        return callback(err);
      }

      if (app.password === password) {
        return callback(null, app);
      } else {
        return callback();
      }
    });
};

// Hashing a password before saving it to the database
// AppSchema.pre('save', function (next) {
//   var app = this;
//   bcrypt.hash(app.password, 10, function (err, hash) {
//     if (err) {
//       return next(err);
//     }
//     app.password = hash;
//     next();
//   })
// });

const App = mongoose.model('App', AppSchema);
module.exports.App = App;
