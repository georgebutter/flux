var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermalinkSchema = new Schema({
  permalink: {
    required: 'Please enter a permalink',
    trim: true,
    type: String,
    unique: true
  },
  object: {
    type: Schema.Types.ObjectId,
    refPath: 'objectModel',
  },
  objectModel: {
    type: String,
    required: true,
    enum: ['Collection', 'Item']
  }
});
PermalinkSchema.index({ object: 1 }); // schema level

const Permalink = mongoose.model('Permalink', PermalinkSchema);
module.exports.Permalink = Permalink;
