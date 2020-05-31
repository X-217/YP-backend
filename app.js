const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errorHandler } = require(path.join(__dirname, 'middlewares/errorHandler.js'));
const cards = require(path.join(__dirname, 'routes/cards.js'));
const users = require(path.join(__dirname, 'routes/users.js'));
const app = express();
const PORT = process.env.PORT || 3000;
const mongoDb = {
  site: 'localhost',
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
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = { _id: '5ec94340b131092b0480cb37' };
  next();
});
app.use('/users', users);
app.use('/cards', cards);
app.all('*', (req, res) => {
  res.status(404).send({ errName: 'Not Found', message: 'Запрашиваемый ресурс не найден' });
});
app.use(errorHandler);


startDatabase()
  .then(app.listen(PORT));
