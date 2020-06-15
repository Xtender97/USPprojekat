const Model = require('sequelize').Model;
const Sequelize = require('sequelize');

const sequelize = require('../databaseConnection');



class Kvar extends Model { };

Kvar.init({
    opstina: {
        type: Sequelize.STRING
    },
    lokacija: {
        type: Sequelize.STRING
    },
    datumpocetka: {
        type: Sequelize.DATE
    },

    datumkraja: {
        type: Sequelize.DATE
    }



}, {
    sequelize,
    modelName: 'kvar'
});

module.exports = Kvar;

