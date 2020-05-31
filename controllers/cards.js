const path = require('path');

const Card = require(path.join(__dirname, '../models/card'));

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const removeCardByID = (req, res, next) => {
  Card.findOneAndDelete({ _id: req.params.id })
    .orFail()
    .then((card) => {
      const message = 'Карточка успешно удалена';
      res.status(200).send({ message, card });
    })
    .catch((err) => {
      err.message = `Невозможно удалить карточку: ${err.message}`;
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      err.message = `Ошибка создания карточки: ${err.message}`;
      next(err);
    });
};

const likeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      err.message = `Ошибка добавления лайка: ${err.message}`;
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      err.message = `Ошибка снятия лайка: ${err.message}`;
      next(err);
    });
};

module.exports = {
  getAllCards,
  removeCardByID,
  createCard,
  likeCard,
  dislikeCard,
};
