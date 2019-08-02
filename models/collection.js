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
    type: Schema.Types.ObjectId,
    ref: 'Permalink',
    required: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

CollectionSchema.statics.getFullCollection = function (find, callback) {
  Collection
  .findOne(find)
  .populate('items')
  .populate('permalink')
  .exec(function (err, collection) {
    if (err) {
      return callback(err)
    }
    const returnCollection = {
      title: collection.title,
      handle: collection.handle,
      id: collection.id,
      permalink: collection.permalink.permalink,
      items: collection.items
    }
    return callback(null, returnCollection);
  });
}

CollectionSchema.statics.getFullCollections = function (find, callback) {
  Collection
  .find(find)
  .populate('items')
  .populate('permalink')
  .exec(function (err, collections) {
    if (err) {
      return callback(err)
    }
    return callback(null, collections);
  });
}

const Collection = mongoose.model('Collection', CollectionSchema);
module.exports.Collection = Collection;
