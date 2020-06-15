const Model = require('sequelize').Model;
const Sequelize = require('sequelize');

const sequelize = require('../databaseConnection');



class User extends Model {};

User.init({
    ime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    prezime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    sifra: {
        type: Sequelize.STRING,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'user'
});

module.exports = User;
    
