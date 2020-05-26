const path = require('path');

const Card = require(path.join(__dirname, '../models/card'));

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      const message = 'Произошла ошибка';
      const error = err.message;
      res.status(500).send({ message, error });
    });
};

const removeCardByID = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then((card) => {
      if (card) {
        const message = 'Карточка успешно удалена';
        res.status(200).send({ message });
      } else {
        throw new Error();
      }
    })
    .catch((err) => {
      const message = 'Невозможно удалить: карточки с данным ID не существует';
      const error = err.message;
      res.status(400).send({ message, error });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      const message = 'Ошибка создания карточки';
      const error = err.message;
      const errStatus = (error.includes('validation')) ? 400 : 500;
      res.status(errStatus).send({ message, error });
    });
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      const message = 'Ошибка добавления лайка';
      const error = err.message;
      res.status(500).send({ message, error });
    });
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      const message = 'Ошибка снятия лайка';
      const error = err.message;
      res.status(500).send({ message, error });
    });
};

module.exports = {
  getAllCards,
  removeCardByID,
  createCard,
  likeCard,
  dislikeCard,
};
