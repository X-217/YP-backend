const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cards = require(path.join(__dirname, 'routes/cards.js'));
const users = require(path.join(__dirname, 'routes/users.js'));

const PORT = process.env.PORT || 3000;
const mongoDB = 'mongodb://localhost:27017/mestodb';
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5ec9a21e57a4871a40272313',
  };
  next();
});
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
