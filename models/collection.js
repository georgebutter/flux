var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  title: {
    required: 'Please enter a name',
    trim: true,
    type: String
  },
  handle: {
    required: 'Please enter a handle',
    trim: true,
    type: String,
    unique: true
  },
  permalink: {
    required: 'Please enter a permalink',
    trim: true,
    type: String,
    unique: true
  }
},
{
  collection: 'collections',
  timestamps: false,
  strict: false
});

const Collection = mongoose.model('Collection', CollectionSchema);
module.exports.Collection = Collection;
