const path = require('path');
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllCards,
  removeCardByID,
  createCard,
  likeCard,
  dislikeCard,
} = require(path.join(__dirname, '../controllers/cards.js'));

router.get('/', getAllCards);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), removeCardByID);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }).unknown(true),
}), createCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = router;
