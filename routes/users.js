var express = require('express');
const { createUser, fetchUsers, authUser, logout, updateUser } = require('../controller/userController');
const { protect, admin } = require('../middleware/authMiddleware');
var router = express.Router();

/* GET users listing. */
router.route('/').get(protect, admin, fetchUsers);
router.post('/addUser', createUser);
router.post('/authUser', authUser);
router.put('/updateUser', protect, updateUser);
router.post('/logout', logout);
// router.put('/editUser/:id', editUser);
// router.delete('/deleteUser/:id', deleteUser);

module.exports = router;
