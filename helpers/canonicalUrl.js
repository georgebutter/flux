exports.canonicalUrl = (req) => {
  return `${req.protocol}${req.protocol ? '://' : '' }${req.hostname}${req.path}`;
};
