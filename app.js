const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const cards = require(path.join(__dirname, 'routes/cards.js'));
// eslint-disable-next-line import/no-dynamic-require
const users = require(path.join(__dirname, 'routes/users.js'));

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use('/cards', cards);
app.use('/users', users);
app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.listen(PORT);
