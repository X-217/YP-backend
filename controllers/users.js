const { NODE_ENV, JWT_SECRET } = process.env;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require(path.join(__dirname, '../models/user.js'));
const { NotFound, Unauthorized } = require(path.join(__dirname, '../errors/http-errors'));

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getUserByID = async (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => { throw new NotFound(`Пользователя с id ${req.params.id} не существует`); })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(200).send(user.hide('password')))
    .then((user) => {
      delete user.password;
      res.status(200)
        .send(user);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => { throw new Unauthorized('Неправильные почта или пароль'); })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) { throw new Unauthorized('Неправильные почта или пароль'); }
          const token = jwt.sign({ _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' });
          res.status(200).cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
            .send({ message: 'Успешная авторизация' });
        })
        .catch(next);
    })
    .catch(next);
};

const patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => { throw new NotFound(`Пользователя с id ${req.user._id} не существует`); })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => { throw new NotFound(`Пользователя с id ${req.user._id} не существует`); })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  login,
  patchUser,
  patchUserAvatar,
};
