const path = require('path');

const NotFound = require(path.join(__dirname, './http-errors_not-found'));
const Unauthorized = require(path.join(__dirname, './http-errors_unauthorized'));
const Conflict = require(path.join(__dirname, './http-errors_сonflict'));
const Forbidden = require(path.join(__dirname, './http-errors_forbidden'));


module.exports = {
  NotFound, Unauthorized, Conflict, Forbidden,
};
