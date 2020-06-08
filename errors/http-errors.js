const CastError = require('./http-errors_cast');
const NotFound = require('./http-errors_not-found');
const Unauthorized = require('./http-errors_unauthorized');
const ValidationError = require('./http-errors_validation');
const ConflictError = require('./http-errors_сonflict');
const Forbidden = require('./http-errors_forbidden');


module.exports = {
  ConflictError, NotFound, Unauthorized, ValidationError, Conflict: ConflictError, Forbidden,
};
