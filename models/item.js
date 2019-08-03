var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
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
  description: {
    type: String
  },
  excerpt: {
    type: String
  },
  collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
  tags: {
    type: Array
  }
});

ItemSchema.statics.getFlat = function (find, callback) {
  Item
  .findOne(find)
  .exec(function (err, item) {
    if (err) {
      return callback(err)
    }
    const returnItem = {
      title: item.title,
      handle: item.handle,
      id: item.id,
      description: item.description,
      excerpt: item.excerpt,
      tags: item.tags,
      collections: item.collections.map(col => col.toString()),
    }
    return callback(null, returnItem);
  });
}

ItemSchema.statics.getManyFlat = function (find, callback) {
  Item
  .find(find)
  .exec(function (err, items) {
    if (err) {
      return callback(err)
    }
    const returnItems = items.map(item => ({
      title: item.title,
      handle: item.handle,
      id: item.id,
      description: item.description,
      excerpt: item.excerpt,
      tags: item.tags,
      collections: item.collections.map(col => col.toString()),
    }))
    return callback(null, returnItems);
  });
}

const Item = mongoose.model('Item', ItemSchema);
module.exports.Item = Item;
