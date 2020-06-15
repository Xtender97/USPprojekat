const Model = require('sequelize').Model;
const Sequelize = require('sequelize');

const sequelize = require('../databaseConnection');



class Preduzece extends Model {};

Preduzece.init({
    ime: {
        type: Sequelize.STRING,
        allowNull: false
    }
   

},{
    sequelize,
    modelName: 'preduzece'
});

module.exports = Preduzece;
    
