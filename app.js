const express = require('express');
const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const cards = require(path.join(__dirname, 'routes/cards.js'));
// eslint-disable-next-line import/no-dynamic-require
const users = require(path.join(__dirname, 'routes/users.js'));

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/cards', cards);
app.use('/users', users);
app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
