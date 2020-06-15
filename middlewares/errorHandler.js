const { isCelebrate } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  const statusCode = (isCelebrate(err) || (err.name === 'CastError' || 'ValidationError')) ? 400 : err.statusCode || 500;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : err.message });
  next();
};

module.exports = errorHandler;
