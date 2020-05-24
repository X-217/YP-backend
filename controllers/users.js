const path = require('path');

const User = require(path.join(__dirname, '../models/user.js'));

const getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUserByID = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Пользователя с данным ID не существует' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Ошибка добавления пользователя', name }));
};

const patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Ошибка обновления информации пользователя', name }));
};

const patchUserAvatar = (req, res) => {
  const { avatar, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Ошибка обновления аватара пользователя', name }));
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  patchUser,
  patchUserAvatar,
};
