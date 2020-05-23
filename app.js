const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// eslint-disable-next-line import/no-dynamic-require
const cards = require(path.join(__dirname, 'routes/cards.js'));
// eslint-disable-next-line import/no-dynamic-require
const users = require(path.join(__dirname, 'routes/users.js'));

const PORT = process.env.PORT || 3000;
const mongoDB = 'mongodb://localhost:27017/mestodb';
const app = express();

app.use(bodyParser.json());
app.use('/users', users);
app.use('/cards', cards);
app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

try {
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
} catch (err) {
  console.log('Ошибка подключения к БД', err);
}
app.listen(PORT);
