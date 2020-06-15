const Model = require('sequelize').Model;
const Sequelize = require('sequelize');

const sequelize = require('../databaseConnection');



class Pretplatnik extends Model { };

Pretplatnik.init({
    email:{
        type: Sequelize.STRING
    },
    opstina: {
        type: Sequelize.STRING
    }



}, {
    sequelize,
    modelName: 'pretplatnik'
});

module.exports = Pretplatnik;

