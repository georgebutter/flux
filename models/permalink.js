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
PermalinkSchema.index({ object: 1, permalink: 1 });

PermalinkSchema.statics.getFull = function (find, callback) {
  Permalink
  .findOne(find)
  .populate('object')
  .exec(function (err, permalink) {
    if (err) {
      return callback(err)
    }
    if (!permalink) {
      // console.log(`Permalink`)
      // console.log(find)
      return callback('no permalink found')

    }
    const returnPermalink = {
      permalink: permalink.permalink,
      objectModel: permalink.objectModel,
      id: permalink.id,
      object: permalink.object
    }
    return callback(null, returnPermalink);
  });
}

const Permalink = mongoose.model('Permalink', PermalinkSchema);
module.exports.Permalink = Permalink;
