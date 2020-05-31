const path = require('path');

const User = require(path.join(__dirname, '../models/user.js'));

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const getUserByID = (req, res, next) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      err.message = `Пользователя не существует: ${err.message}`;
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      err.message = `Ошибка добавления пользователя: ${err.message}`;
      next(err);
    });
};

const patchUser = (req, res, next) => {
  const { name, about } = req.body;
  const userID = req.user._id;
  User.findByIdAndUpdate(userID, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      err.message = `Невозможно обновить профиль пользователя: ${err.message}`;
      next(err);
    });
};

const patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userID = req.user._id;
  User.findByIdAndUpdate(userID, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      err.message = `Невозможно обновить аватар пользователя: ${err.message}`;
      next(err);
    });
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  patchUser,
  patchUserAvatar,
};
