const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('users', 'ajay', 'ajay0911@', {
    host: 'localhost',
    dialect: 'mysql'
})

const testConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established');
    } catch(err) {
        console.log(`unable to connect database, error: ${err}`);
    }
}

testConnection();

module.exports = sequelize;