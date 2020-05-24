const path = require('path');
const router = require('express').Router();

const {
  getAllUsers,
  getUserByID,
  createUser,
  patchUser,
  patchUserAvatar,
} = require(path.join(__dirname, '../controllers/users.js'));

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
