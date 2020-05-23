const path = require('path');
const router = require('express').Router();
// eslint-disable-next-line import/no-dynamic-require
const { getAllCards, removeCardByID, createCard } = require(path.join(__dirname, '../controllers/cards.js'));

router.get('/', getAllCards);

router.delete('/:id', removeCardByID);

router.post('/', createCard);

module.exports = router;
