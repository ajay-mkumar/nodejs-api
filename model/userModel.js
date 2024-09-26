const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    tableName: 'users',
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