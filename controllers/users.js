const path = require('path');

const User = require(path.join(__dirname, '../models/user.js'));

const getAllUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      const { message } = err;
      const error = 'Произошла ошибка';
      res.status(500).send({ error, message });
    });
};

const getUserByID = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      const { message } = err;
      const errName = err.name;
      let errStatus = 500;
      let error = 'Произошла ошибка';
      if ((errName === 'CatError') || (errName === 'DocumentNotFoundError')) {
        errStatus = 400;
        error = `Пользователя с ID ${req.params.id} не существует`;
      }
      res.status(errStatus).send({ error, message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      const { message } = err;
      const error = 'Ошибка добавления пользователя';
      const errStatus = (err.name === 'ValidationError') ? 400 : 500;
      res.status(errStatus).send({ error, message });
    });
};

const patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      const { message } = err;
      const error = 'Ошибка обновления информации пользователя';
      const errStatus = (err.name === 'ValidationError') ? 400 : 500;
      res.status(errStatus).send({ error, message });
    });
};

const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      const { message } = err;
      const error = 'Ошибка обновления аватара пользователя';
      const errStatus = (err.name === 'ValidationError') ? 400 : 500;
      res.status(errStatus).send({ error, message });
    });
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  patchUser,
  patchUserAvatar,
};
