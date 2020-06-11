const { isCelebrate } = require('celebrate');

module.exports.errorHandler = (err, req, res, next) => {
  if (isCelebrate(err)) { err.statusCode = 400; }
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
};
