const Sequelize = require('sequelize');

const sequelize = new Sequelize('usp','root' , 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;