const path = require('path');

const Card = require(path.join(__dirname, '../models/card'));

const getAllCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const removeCardByID = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(() => res.status(200).send({ message: 'Карточка успешно удалена' }))
    .catch(() => res.status(500).send({ message: 'Карточки с данным ID не существует' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Ошибка добавления карточки' }));
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Ошибка добавления лайка' }));
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Ошибка снятия лайка' }));
};

module.exports = {
  getAllCards,
  removeCardByID,
  createCard,
  likeCard,
  dislikeCard,
};
