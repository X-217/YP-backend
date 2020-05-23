const path = require('path');
const router = require('express').Router();
// eslint-disable-next-line import/no-dynamic-require
const { getAllUsers, getUserByID, createUser } = require(path.join(__dirname, '../controllers/users.js'));

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserByID);

module.exports = router;
