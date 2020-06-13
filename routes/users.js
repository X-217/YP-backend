const path = require('path');
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const url = require(path.join(__dirname, '../validators/url'));

const {
  getAllUsers,
  getUserByID,
  patchUser,
  patchUserAvatar,
} = require(path.join(__dirname, '../controllers/users.js'));

router.get('/', getAllUsers);
router.get('/:id', celebrate({
  params: Joi.object().keys({ id: Joi.string().alphanum().length(24) }),
}), getUserByID);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({ avatar: Joi.string().required().custom(url) }),
}), patchUserAvatar);

module.exports = router;
