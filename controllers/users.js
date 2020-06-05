const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require(path.join(__dirname, '../models/user.js'));

const getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send({ error: `Произошла ошибка : ${err.name}` }));
};

const getUserByID = async (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      const errStatus = (err.name === 'DocumentNotFoundError') ? 404 : 400;
      res.status(errStatus).send({ error: `Невозможно получить данные пользователя: ${err.name}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email })
    .orFail()
    .then(() => res.status(409).send({ message: 'Пользователь с данной почтой уже зарегистрирован' }))
    .catch(() => {
      bcrypt.hash(password, 10)
        .then((hash) => User.create({ name, about, avatar, email, password: hash }))
        .then((user) => res.status(200).send({ message: `Создан новый пользователь, ID: '${user._id}'` }))
        .catch((err) => res.status(400).send({ error: `Невозможно создать пользователя: ${err.message}` }));
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) { throw new Error('Неправильные почта или пароль'); }
        const token = jwt.sign({ _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' });
        res.status(200).cookie('jwt', token, { httpOnly: true, sameSite: true }).send({ message: 'Успешная авторизация' });
      }))
    .catch(() => res.status(401).send({ error: 'Неправильные почта или пароль' }));
};

const patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      const errStatus = (err.name === 'DocumentNotFoundError') ? 404 : 400;
      res.status(errStatus).send({ error: `Невозможно обновить профиль пользователя: ${err.name}` });
    });
};

const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      const errStatus = (err.name === 'DocumentNotFoundError') ? 404 : 400;
      res.status(errStatus).send({ error: `Невозможно обновить аватар пользователя: ${err.name}` });
    });
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  login,
  patchUser,
  patchUserAvatar,
};
