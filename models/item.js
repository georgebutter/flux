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
  collections: {
    type: Array,
  },
});

const Item = mongoose.model('Item', ItemSchema);
module.exports.Item = Item;
