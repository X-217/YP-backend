const router = require('express').Router();
const users = require('../data/users.json');

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line no-underscore-dangle
  const result = users.find((item) => item._id === id);
  if (!result) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
  res.send(result);
});

module.exports = router;
