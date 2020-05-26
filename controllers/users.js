const path = require('path');

const User = require(path.join(__dirname, '../models/user.js'));

const getAllUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      const message = 'Произошла ошибка';
      const error = err.message;
      res.status(500).send({ message, error });
    });
};

const getUserByID = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      const message = 'Пользователя с данным ID не существует';
      const error = err.message;
      res.status(400).send({ message, error });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      const message = 'Ошибка добавления пользователя';
      const error = err.message;
      const errStatus = (error.includes('validation')) ? 400 : 500;
      res.status(errStatus).send({ message, error });
    });
};

const patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      const message = 'Ошибка обновления информации пользователя';
      const error = err.message;
      const errStatus = (error.includes('validation')) ? 400 : 500;
      res.status(errStatus).send({ message, error });
    });
};

const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      const message = 'Ошибка обновления аватара пользователя';
      const error = err.message;
      const errStatus = (error.includes('validation')) ? 400 : 500;
      res.status(errStatus).send({ message, error });
    });
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  patchUser,
  patchUserAvatar,
};
