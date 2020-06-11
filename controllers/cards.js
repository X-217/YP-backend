const path = require('path');

const Card = require(path.join(__dirname, '../models/card'));
const { NotFound, Forbidden } = require(path.join(__dirname, '../errors/http-errors'));

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({
    name, link, owner,
  })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const removeCardByID = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .orFail(() => { throw new NotFound(`Карточки с id ${req.params.cardId} не существует`); })
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        Card.findOneAndDelete({ _id: req.params.cardId })
          .then(() => res.status(200).send({ message: `Карточка ${req.params.cardId} успешно удалена` }))
          .catch(next);
      } else {
        throw new Forbidden('Невозможно удалить чужую карточку');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findOne({ _id: req.params.cardId })
    .orFail(() => { throw new NotFound(`Карточки с id ${req.params.cardId} не существует`); })
    .then((card) => {
      if (card.likes.includes(owner)) { throw new Forbidden('У карточки уже есть лайк от текущего пользователя'); }
      Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
        .then((card) => res.status(200).send(card))
        .catch(next);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findOne({ _id: req.params.cardId })
    .orFail(() => { throw new NotFound(`Карточки с id ${req.params.cardId} не существует`); })
    .then((card) => {
      if (!card.likes.includes(owner)) { throw new Forbidden('Невозможно: нет лайков от текущего пользователя'); }
      Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
        .then((card) => res.status(200).send(card))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  removeCardByID,
  createCard,
  likeCard,
  dislikeCard,
};
