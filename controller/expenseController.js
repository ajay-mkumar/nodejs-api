const asyncHandler = require('../middleware/asyncHandler');
const expenseModel = require('../model/expenseModel');

const index = (req, res) => {
    res.send('expense homepage!');
}

const fetchExpense = asyncHandler(async(req, res) => {
    const expenses = await expenseModel.findAll({
        where:
        {
            userId: req.user.id
        }
    });

    res.status(200).json({expenses});
})

const addExpense = asyncHandler(async(req, res) => {
    const { expense, createdAt } = req.body;

    const userId = req.user.id;
    if (!userId) {
        res.status(404).send('User not found!');
    }

    await expenseModel.create({
        userId: userId,
        expenses: expense,
        createdAt: createdAt
    });

    res.status(200).send('Expense added');
})

const editExpense = asyncHandler(async(req, res) => {
    const { expenseId } = req.params;
    const { expense, createdAt } = req.body;
    const expenseData = await expenseModel.findOne({
        where:
        {
            id: expenseId,
            userId: req.user.id
        },
    });

    if (!expenseData) {
        res.status(404).send('Expense not found!');
    }

    if (expense) expenseData.expenses = expense;
    if (createdAt) expenseData.createdAt = createdAt;
    await expenseData.save();

    res.status(202).send('Expense updated!')
})

const deleteExpense = asyncHandler(async(req, res) => {
    const { expenseId } = req.params;

    await expenseModel.destroy({
        where: {
            id: expenseId,
            userId:req.user.id,
        }
    });

    res.status(200).send('Deleted successfully');
})

module.exports = { index, addExpense, fetchExpense, editExpense, deleteExpense }