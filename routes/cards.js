const path = require('path');
const router = require('express').Router();

const {
  getAllCards,
  removeCardByID,
  createCard,
  likeCard,
  dislikeCard,
} = require(path.join(__dirname, '../controllers/cards.js'));

router.get('/', getAllCards);
router.delete('/:id', removeCardByID);
router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
