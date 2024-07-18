'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Treasure extends Model {
    static associate(models) {
      // Treasure has many MoneyValues
      Treasure.hasMany(models.MoneyValue, {
        foreignKey: 'treasure_id',
        as: 'moneyValues'
      });
    }
  }
  Treasure.init({
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Treasure',
  });
  return Treasure;
};