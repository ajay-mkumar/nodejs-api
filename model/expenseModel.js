const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

const Expense = sequelize.define('Expense', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        index: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    expenses: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'expense',
    timestamps: true,
});

User.hasMany(Expense, { foreignKey: 'userId' })
Expense.belongsTo(User, { foreignKey: {name: 'userId', index: false} })

module.exports = Expense