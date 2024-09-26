var express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { index, addExpense, fetchExpense, editExpense, deleteExpense } = require('../controller/expenseController');
var router = express.Router();

/* GET home page. */
router.get('/', protect, fetchExpense);
router.post('/addExpense', protect, addExpense);
router.put('/editExpense/:expenseId', protect, editExpense);
router.delete('/delete/:expenseId', protect, deleteExpense);

module.exports = router;
