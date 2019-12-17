const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  title: {
    type: String,
    required: 'Link title cannot be blank',
  },
  url: {
    type: String,
    required: 'Url cannot be blank',
  },
});

const NavigationSchema = new Schema({
  title: {
    required: 'Please enter a title',
    trim: true,
    type: String,
  },
  handle: {
    required: 'Please enter a handle',
    trim: true,
    type: String,
  },
  links: [LinkSchema],
});

NavigationSchema.statics.getManyFlat = function(find, callback) {
  Navigation
    .find(find)
    .exec(function(err, navigations) {
      if (err) {
        return callback(err);
      }
      const returnNavigations = navigations.map((navigation) => ({
        title: navigation.title,
        handle: navigation.handle,
        id: navigation.id,
        links: navigation.links,
      }));
      return callback(null, returnNavigations);
    });
};

NavigationSchema.statics.getFlat = function(find, callback) {
  Navigation
    .findOne(find)
    .exec(function(err, navigation) {
      if (err) {
        return callback(err);
      }
      const returnNavigation = {
        title: navigation.title,
        handle: navigation.handle,
        id: navigation.id,
        links: navigation.links,
      };
      return callback(null, returnNavigation);
    });
};

const Navigation = mongoose.model('Navigation', NavigationSchema);
module.exports.Navigation = Navigation;
