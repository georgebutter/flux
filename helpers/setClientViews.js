const path = require('path');

exports.setClientViews = (app) => {
  app.set('views', [
    path.resolve(`./client/theme/layouts`),
    path.resolve(`./client/theme/templates`),
    path.resolve(`./client/theme/snippets`),
  ]);
}
