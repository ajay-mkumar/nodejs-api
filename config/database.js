const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
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