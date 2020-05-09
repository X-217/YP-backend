const path = require('path');
const router = require('express').Router();
// eslint-disable-next-line import/no-dynamic-require
const users = require(path.join(__dirname, 'data/users.json'));

router.get('/', (req, res) => {
  res.send(users);
});

// eslint-disable-next-line consistent-return
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line no-underscore-dangle
  const result = users.find((item) => item._id === id);
  if (!result) {
    return res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
  res.send(result);
});

module.exports = router;
