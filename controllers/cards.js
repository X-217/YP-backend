const path = require('path');

const Card = require(path.join(__dirname, '../models/card'));

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ error: `Произошла ошибка : ${err.name}` }));
};

const removeCardByID = (req, res) => {
  Card.findOne({ _id: req.params.id })
    .orFail()
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        Card.findOneAndDelete({ _id: req.params.id })
          .then(() => res.status(200).send({ message: `Карточка ${req.params.id} успешно удалена` }));
      } else {
        res.status(403).send({ error: 'Невозможно удалить чужую карточку' });
      }
    })
    .catch((err) => {
      const errStatus = (err.name === 'DocumentNotFoundError') ? 404 : 400;
      res.status(errStatus).send({ error: `Невозможно удалить карточку: ${err.name}` });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(400).send({ error: `Ошибка создания карточки : ${err.name}` }));
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      const errStatus = (err.name === 'DocumentNotFoundError') ? 404 : 400;
      res.status(errStatus).send({ error: `Ошибка добавления лайка: ${err.name}` });
    });
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      const errStatus = (err.name === 'DocumentNotFoundError') ? 404 : 400;
      res.status(errStatus).send({ error: `Ошибка снятия лайка: ${err.name}` });
    });
};

module.exports = {
  getAllCards,
  removeCardByID,
  createCard,
  likeCard,
  dislikeCard,
};
