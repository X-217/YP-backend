require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { Forbidden } = require('./errors/http-errors');

const url = require(path.join(__dirname, './validators/url'));
const errorHandler = require(path.join(__dirname, 'middlewares/errorHandler.js'));
const { auth } = require(path.join(__dirname, 'middlewares/auth.js'));
const cards = require(path.join(__dirname, 'routes/cards.js'));
const users = require(path.join(__dirname, 'routes/users.js'));
const { login, createUser } = require(path.join(__dirname, 'controllers/users.js'));
const app = express();
const PORT = process.env.PORT || 3000;
const mongoDb = {
  site: process.env.DB_HOST || 'localhost',
  port: process.env.MONGODB_URI || '27017',
  name: 'mestodb',
};
const startDatabase = async () => {
  try {
    await mongoose.connect(`mongodb://${mongoDb.site}:${mongoDb.port}/${mongoDb.name}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Ошибка подключения к БД, порт ${mongoDb.port}`, err);
  }
};
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(url),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.use(auth);
app.use('/users', users);
app.use('/cards', cards);

app.all('*', () => { throw new Forbidden('Запрашиваемый ресурс не найден'); });
app.use(errorLogger);
app.use(errorHandler);

startDatabase()
  .then(app.listen(PORT));
