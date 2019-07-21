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
  },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

CollectionSchema.statics.getFullCollection = function ( callback) {
  Collection
  .find()
  .populate('items')
  .exec(function (err, collections) {
    if (err) {
      return callback(err)
    }
    return callback(null, collections);
  });
}

const Collection = mongoose.model('Collection', CollectionSchema);
module.exports.Collection = Collection;
