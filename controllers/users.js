const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
// обработка запроса с недостающими полями
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => { res.status(200).send(user); })
    .catch((err) => {
      err.message = `Ошибка добавления пользователя: ${err.message}`;
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  User.findOne({ email })
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) { throw new Error('Неправильные почта или пароль'); }
        const token = jwt.sign({ _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' });
        res
          .status(200)
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
          .end();
      }))
    .catch((err) => {
      err.name = 'Unauthorized';
      err.message = 'Неправильные почта или пароль';
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
  login,
  patchUser,
  patchUserAvatar,
};
