const validator = require('validator');

const url = (link) => {
  if (!validator.isURL(link)) { throw new Error('is not URL'); }
  return link;
};

module.exports = url;
