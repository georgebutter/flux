const path = require('path');

exports.setAdminViews = (app) => {
  app.set('views', [
    path.resolve(`./client/admin/layouts`),
    path.resolve(`./client/admin/templates`),
    path.resolve(`./client/admin/snippets`),
  ]);
}
