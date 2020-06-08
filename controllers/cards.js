const path = require('path');

const Card = require(path.join(__dirname, '../models/card'));

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(err));
};

const removeCardByID = (req, res, next) => {
  Card.findOne({ _id: req.params.id })
    .orFail()
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        Card.findOneAndDelete({ _id: req.params.id })
          .then(() => res.status(200).send({ message: `Карточка ${req.params.id} успешно удалена` }));
      } else {
        next({ name: 'Forbidden', message: 'Невозможно удалить чужую карточку' });
      }
    })
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => next(err));
};

const dislikeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => next(err));
};

module.exports = {
  getAllCards,
  removeCardByID,
  createCard,
  likeCard,
  dislikeCard,
};
