const { DataTypes} = require('sequelize');
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
    }
}, {
    timestamps: true
});

(async() => {
    await sequelize.sync({force: true});
    console.log('database and table are created');
})();

module.exports = User;