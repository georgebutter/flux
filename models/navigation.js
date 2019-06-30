var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  title: {
    type: String,
    required: 'Link title cannot be blank',
  },
  url: {
    type: String,
    required: 'Url cannot be blank',
  }
})

const NavigationSchema = new Schema({
  title: {
    required: 'Please enter a title',
    trim: true,
    type: String
  },
  handle: {
    required: 'Please enter a handle',
    trim: true,
    type: String
  },
  links: [LinkSchema]
});

const Navigation = mongoose.model('Navigation', NavigationSchema);
module.exports.Navigation = Navigation;
