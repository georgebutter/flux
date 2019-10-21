const { canonicalUrl } = require('./canonicalUrl');
const { getAdmin, getLogin } = require('./admin');

exports.getAdmin = getAdmin;
exports.getLogin = getLogin;
exports.canonicalUrl = canonicalUrl;
