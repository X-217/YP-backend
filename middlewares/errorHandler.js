module.exports.errorHandler = (err, req, res, next) => {
  const errorCodes = {
    DocumentNotFoundError: 404,
    CastError: 400,
    ValidationError: 400,
  };
  const errName = err.name;
  const { message } = err || 'Неизвестная ошибка';
  const errStatus = errorCodes[err.name] || 500;
  res.status(errStatus).send({ errName, message });
  next();
};
