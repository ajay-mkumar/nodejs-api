const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const asyncHandler = require('../middleware/asyncHandler');

const User = sequelize.define('User1', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synced!');
    })
    .catch((err) => {
        console.log(`sync error ${err}`);
    })
    
module.exports = User;