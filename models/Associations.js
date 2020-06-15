const Kvar = require('./Kvar');
const Preduzece = require('./Preduzece');
const Pretplatnik = require('./Pretplatnik');
const User = require('./User');


User.belongsTo(Preduzece, {foreignKey: 'idpreduzeca'});