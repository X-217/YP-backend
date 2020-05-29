const path = require('path');

const Card = require(path.join(__dirname, '../models/card'));

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      const { message } = err;
      const error = 'Произошла ошибка';
      res.status(500).send({ error, message });
    });
};

const removeCardByID = (req, res) => {
  Card.findOneAndDelete({ _id: req.params.id })
    .orFail()
    .then(() => {
      const message = 'Карточка успешно удалена';
      res.status(200).send({ message });
    })
    .catch((err) => {
      const { message } = err;
      const errName = err.name;
      let errStatus = 500;
      let error = 'Произошла ошибка';
      if ((errName === 'CatError') || (errName === 'DocumentNotFoundError')) {
        errStatus = 400;
        error = `Невозможно удалить, карточки с ID ${req.params.id} не существует`;
      }
      res.status(errStatus).send({ error, message });
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
      const error = 'Ошибка создания карточки';
      const { message } = err;
      const errStatus = (err.name === 'ValidationError') ? 400 : 500;
      res.status(errStatus).send({ error, message });
    });
};

const likeCard = (req, res) => {
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
      const error = 'Ошибка добавления лайка';
      const { message } = err;
      const errStatus = (err.name === 'DocumentNotFoundError') ? 400 : 500;
      res.status(errStatus).send({ error, message });
    });
};

const dislikeCard = (req, res) => {
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
      const error = 'Ошибка снятия лайка';
      const { message } = err;
      const errStatus = (err.name === 'DocumentNotFoundError') ? 400 : 500;
      res.status(errStatus).send({ error, message });
    });
};

module.exports = {
  getAllCards,
  removeCardByID,
  createCard,
  likeCard,
  dislikeCard,
};
