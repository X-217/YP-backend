const jwt = require('jsonwebtoken');
const path = require('path');

const { Unauthorized } = require(path.join(__dirname, '../errors/http-errors'));

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    next();
  } catch (e) {
    throw new Unauthorized('Требуется авторизация');
  }
};
