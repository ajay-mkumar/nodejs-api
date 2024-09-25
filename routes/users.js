var express = require('express');
const { createUser, fetchUsers } = require('../controller/userController');
var router = express.Router();

/* GET users listing. */
router.get('/', fetchUsers);
router.post('/addUser', createUser);
// router.put('/editUser/:id', editUser);
// router.delete('/deleteUser/:id', deleteUser);

module.exports = router;
