const path = require('path');

const NotFound = require(path.join(__dirname, './http-errors_not-found'));
const Unauthorized = require(path.join(__dirname, './http-errors_unauthorized'));
const Forbidden = require(path.join(__dirname, './http-errors_forbidden'));

module.exports = {
  NotFound, Unauthorized, Forbidden,
};
