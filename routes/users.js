const path = require('path');
const router = require('express').Router();

const { getAllUsers, getUserByID, createUser } = require(path.join(__dirname, '../controllers/users.js'));

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserByID);

module.exports = router;
