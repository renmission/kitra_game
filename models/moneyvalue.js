'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoneyValue extends Model {
    static associate(models) {
      // MoneyValue belongs to Treasure
      MoneyValue.belongsTo(models.Treasure, {
        foreignKey: 'treasure_id'
      });
    }
  }
  MoneyValue.init({
    treasure_id: DataTypes.INTEGER,
    amt: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'MoneyValue',
  });
  return MoneyValue;
};
