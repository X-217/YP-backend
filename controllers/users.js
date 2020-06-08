const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const httpErrors = require('../errors/http-errors');


const { NODE_ENV, JWT_SECRET } = process.env;

const User = require(path.join(__dirname, '../models/user.js'));

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

const getUserByID = async (req, res, next) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => next({ name: err.name, message: 'Невозможно получить данные пользователя' }));
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email })
    .orFail()
    .then(() => next({ name: 'Conflict', message: 'Пользователь с данной почтой уже зарегистрирован' }))
    .catch(() => {
      bcrypt.hash(password, 10)
        .then((hash) => User.create({ name, about, avatar, email, password: hash }))
        .then((user) => res.status(200).send({ message: `Создан новый пользователь, ID: '${user._id}'` }))
        .catch((err) => next(err));
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) { next({ name: 'Unauthorized', message: 'Неправильные почта или пароль' }); }
        const token = jwt.sign({ _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' });
        res.status(200).cookie('jwt', token, { httpOnly: true, sameSite: true }).send({ message: 'Успешная авторизация' });
      }))
    .catch(() => next({ name: 'Unauthorized', message: 'Неправильные почта или пароль' }));
};

const patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

const patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  login,
  patchUser,
  patchUserAvatar,
};
