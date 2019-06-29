var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  name: {
    required: 'Please enter a name',
    trim: true,
    type: String
  },
  handle: {
    required: 'Please enter a handle',
    trim: true,
    type: String
  }
},
{
  collection: 'collections',
  timestamps: false,
  strict: false
});

const Collection = mongoose.model('Collection', CollectionSchema);
module.exports.Collection = Collection;
