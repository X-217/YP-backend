require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { errorHandler } = require(path.join(__dirname, 'middlewares/errorHandler.js'));
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
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', users);
app.use('/cards', cards);

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Запрашиваемый ресурс не найден' });
});
app.use(errors());
app.use(errorHandler);

startDatabase()
  .then(app.listen(PORT));
