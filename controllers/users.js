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
      if ((errName === 'CastError') || (errName === 'DocumentNotFoundError')) {
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
  const userID = req.user._id;
  User.findByIdAndUpdate(userID, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      const { message } = err;
      const errName = err.name;
      let errStatus = 500;
      let error = 'Ошибка обновления профиля пользователя';
      if ((errName === 'CastError') || (errName === 'DocumentNotFoundError')) {
        errStatus = 400;
        error = `Невозможно обновить профиль, пользователя с ID ${userID} не существует`;
      }
      res.status(errStatus).send({ error, message });
    });
};

const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userID = req.user._id;
  User.findByIdAndUpdate(userID, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      const { message } = err;
      const errName = err.name;
      let errStatus = 500;
      let error = 'Ошибка обновления аватара пользователя';
      if ((errName === 'CastError') || (errName === 'DocumentNotFoundError')) {
        errStatus = 400;
        error = `Невозможно обновить аватар, пользователя с ID ${userID} не существует`;
      }
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
