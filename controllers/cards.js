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

module.exports = {
  getAllCards,
  removeCardByID,
  createCard,
};
